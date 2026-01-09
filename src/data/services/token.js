"use server";
import { cookies } from "next/headers";

const cookiesConfig = {
  sameSite: 'Lax',
  httpOnly: true,
  secure: true,
  path: '/',
  maxAge: 3 * 24 * 60 * 60,
  expire: 3 * 24 * 60 * 60,
}

export async function getCookiesConfig(name) {
  return cookiesConfig;
}
export async function getCookie(name) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
}

export async function setCookie(name, value) {
  const cookieStore = cookies();
  cookieStore.set(name, value, cookiesConfig);

}

export async function deleteCookie(name) {
  const cookieStore = cookies();

  const deleteConfigs = [
    { ...cookiesConfig },
    { path: '/' },
    { domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN },
    { domain: undefined },
  ];

  for (const config of deleteConfigs) {
    cookieStore.set(name, '', {
      ...config,
      maxAge: 0,
      expires: new Date(0),
    });
  }
}

export async function getAuthToken() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('jwt')?.value;
  return authToken;
}

export async function hasAuthToken() {
  const cookieStore = cookies();
  return !!cookieStore.get('jwt');
}

export async function getAllCookies() {
  const cookieStore = cookies();
  return cookieStore.getAll();
}
