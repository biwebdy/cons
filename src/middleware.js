import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { NextResponse } from "next/server";
import { getFrontEndURL } from "./data/common/serverVariable";
import { getCookiesConfig } from "./data/services/token";

const DEBUG = true;

function debugLog(...args) {
  if (DEBUG) {
    console.log(...args);
  }
}

function createProcessedKey(path, jwt) {
  const hash = jwt.split('.')[2]?.slice(0, 8) || 'no-jwt';
  return `processed_${path.replace(/[^a-zA-Z0-9]/g, '_')}_${hash}`;
}

export const roleMap = {
  ADMIN: "L1",
  CLIENT: "L3",
  SUB_CLIENT: "L4",
  CONSULTANT: "L5",
};

const publicPaths = new Set([
  "/404",
  "/terms",
  "/thank-you",
  "/contact",
  "/privacy",
  "/login",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
  "/secure/login",
  "/secure/register",
  "/secure/forgot-password",
  "/secure/reset-password",
  "/",
  "/docusign/callback",
  "/docusign/callbackframework",
  "/docusign/callbackoffer",
  "/register-client",
  "/thank-you-client",
  "/submit",
  "/fr",
  "/ger",

]);

const consultantPaths = new Set([
  "/consultant-personalized",
  "/consultant-project",
  "/change-password",
  "/edit-profile",
  "/register/contract",
  "/project-initiation",
  "/proposal"
]);

const clientPaths = new Set([
  "/browse-consultants",
  "/client-edit-profile",
  "/client-personalized",
  "/client-project",
  "/consultant-profile",
  "/change-password",
  "/purchase-order",
  "/sub-client-profile",
  "/view-proposal"
]);

const subClientPaths = new Set([
  "/client-account-profile",
  "/client-account-personalized",
  "/change-password",
  "/client-edit-profile",
  "/browse-consultants",
  "/view-proposal",
  "/consultant-profile",
  "/client-project",
  "/purchase-order",
]);

export async function middleware(request) {
  const fetchDest = request.headers.get('sec-fetch-dest');
  const fetchMode = request.headers.get('sec-fetch-mode');
  const currentPath = request.nextUrl.pathname;

  // Handle static assets and API routes  
  if (!isRoute(currentPath)) {
    return NextResponse.next();
  }

  debugLog(`Processing ${currentPath} - Dest: ${fetchDest}, Mode: ${fetchMode}`);

  // Handle public paths  
  if (publicPaths.has(currentPath)) {
    debugLog("Public path access");
    return applyHeaders(NextResponse.next());
  }

  const jwt = request.cookies.get('jwt')?.value;
  debugLog("JWT status:", jwt ? 'present' : 'absent');

  // Handle RSC requests  
  if (fetchDest === 'empty' && fetchMode === 'cors') {
    return handleRSCRequest(request, jwt, currentPath);
  }

  // Handle home page  
  if (currentPath === '/') {
    return handleHomePage(request, jwt);
  }

  // Handle unauthenticated requests to protected routes  
  if (!jwt) {
    debugLog("No JWT for protected route");
    return handleUnauthenticated(request);
  }

  return handleAuthenticatedRequest(request, jwt, currentPath);
}

async function handleRSCRequest(request, jwt, currentPath) {
  return NextResponse.next();
  // if (!jwt && !publicPaths.has(currentPath)) {  
  //   debugLog("RSC: Unauthorized access attempt");  
  //   return new Response(JSON.stringify({ error: 'Unauthorized' }), {  
  //     status: 401,  
  //     headers: {  
  //       'Content-Type': 'application/json',  
  //       'Cache-Control': 'no-store',  
  //     },  
  //   });  
  // }  

  // try {  
  //   if (publicPaths.has(currentPath)) {  
  //     return NextResponse.next();  
  //   }  

  //   const user = await getUserMeLoader(true, true);  
  //   if (!user?.ok) {  
  //     return handleUnauthenticated(request);  
  //   }  

  //   if (!validateRoleAccess(currentPath, user.data.role?.name)) {  
  //     return new Response(JSON.stringify({ error: 'Forbidden' }), {  
  //       status: 403,  
  //       headers: { 'Content-Type': 'application/json' },  
  //     });  
  //   }  

  //   const response = NextResponse.next();  
  //   return applyHeaders(response);  
  // } catch (error) {  
  //   debugLog("RSC Error:", error);  
  //   return new Response(JSON.stringify({ error: 'Server Error' }), {  
  //     status: 500,  
  //     headers: { 'Content-Type': 'application/json' },  
  //   });  
  // }  
}

function handleHomePage(request, jwt) {
  if (!jwt) {
    return applyHeaders(NextResponse.next());
  }
  return handleAuthenticatedRequest(request, jwt, '/');
}

function handleUnauthenticated(request) {
  debugLog("Handling unauthenticated request");
  const response = NextResponse.redirect(new URL('/login', getFrontEndURL()));

  // Clear authentication cookies  
  response.cookies.delete('jwt');

  return applyHeaders(response);
}

async function handleAuthenticatedRequest(request, jwt, currentPath) {
  try {
    const user = await getUserMeLoader(true, true);

    if (!user?.ok) {
      debugLog("Invalid user session");
      return handleUnauthenticated(request);
    }

    // Handle password change requirement  
    if (!user.data?.passwordChanged &&
      currentPath !== "/change-password" &&
      [roleMap.CONSULTANT, roleMap.CLIENT].includes(user.data.role?.name)) {
      debugLog("Redirecting to password change");
      return applyHeaders(
        NextResponse.redirect(new URL('/change-password', getFrontEndURL()))
      );
    }

    // Check role-based access  
    if (!validateRoleAccess(currentPath, user.data.role?.name)) {
      debugLog("Invalid role access");
      return handleUnauthenticated(request);
    }

    // Handle special consultant routes  
    if (user.data.role?.name === roleMap.CONSULTANT) {
      const result = await handleConsultantSpecialCases(currentPath, user.data);
      if (result) return result;
    }

    return applyHeaders(NextResponse.next());
  } catch (error) {
    debugLog("Authentication error:", error);
    return handleUnauthenticated(request);
  }
}

async function handleConsultantSpecialCases(currentPath, userData) {
  if (userData.consultant?.approval !== "APPROVED" &&
    !["/register/contract", "/change-password"].includes(currentPath)) {
    debugLog("Redirecting unapproved consultant");
    return applyHeaders(
      NextResponse.redirect(new URL('/register/contract', getFrontEndURL()))
    );
  }
  return null;
}

function validateRoleAccess(path, roleName) {
  debugLog("Validating role access:", roleName);
  debugLog("Path:", path);
  if (publicPaths.has(path)) return true;

  switch (roleName) {
    case roleMap.ADMIN:
      return path.startsWith("/secure");
    case roleMap.CONSULTANT:
      return matchPath(path, consultantPaths);
    case roleMap.CLIENT:
      return matchPath(path, clientPaths);
    case roleMap.SUB_CLIENT:
      return matchPath(path, subClientPaths);
    default:
      return false;
  }
}

function matchPath(currentPath, allowedPaths) {
  return Array.from(allowedPaths).some(path =>
    currentPath === path || currentPath?.startsWith(path + '/')
  );
}

function isRoute(path) {
  return !path.match(/\.[\w]+$/);
}


// Helper function to generate random base64 string
async function generateNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}


function applyHeaders(response) {

  const nonce = generateNonce();



  const securityHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'X-XSS-Protection': '1; mode=block',
    'Content-Security-Policy': `
    default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval'
        https://*.googletagmanager.com
        https://*.google-analytics.com
        https://*.cloudflareinsights.com
        https://snap.licdn.com
        https://*.linkedin.com
        https://px.ads.linkedin.com
        https://connect.facebook.net;
      script-src-elem 'self' 'unsafe-inline'
        https://*.googletagmanager.com
        https://*.google-analytics.com
        https://*.cloudflareinsights.com
        https://*.linkedin.com
        https://snap.licdn.com
        https://connect.facebook.net;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' blob: data:
        https://*.cloudflareinsights.com
        https://*.linkedin.com
        https://*.facebook.com
        https://*.facebook.ne
        https://*.google-analytics.com
        https://*.analytics.google.com
        https://*.googletagmanager.com
        https://*.g.doubleclick.net
        https://*.google.com
        https://*.google;
      connect-src 'self'
        https://*.google-analytics.com
        https://*.analytics.google.com
        https://*.googletagmanager.com
        https://*.cloudflareinsights.com
        https://*.google.com
        https://*.linkedin.com
        https://*.facebook.com
        https://*.facebook.net
        https://*.google-analytics.com
        https://*.analytics.google.com
        https://*.googletagmanager.com
        https://*.g.doubleclick.net
        https://*.google.com
        https://*.google;
      frame-src 'self'
        https://*.googletagmanager.com
        https://*.facebook.com
        https://*.facebook.net
        https://td.doubleclick.net https://www.googletagmanager.com;
      worker-src 'self' blob:;
      child-src 'self' blob:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()
  };
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  response.headers.set('x-nonce', nonce)

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|assets).*)',
  ],
};  