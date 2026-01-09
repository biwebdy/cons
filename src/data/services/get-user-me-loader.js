"use server";
// import jwt from 'jsonwebtoken';
import { headers } from "next/headers";
import qs from "qs";
import { getPrivateStrapiURL } from "../common/serverVariable";
import { fetchData } from "../common/utils";
import { getAuthToken } from "./token";
const query = qs.stringify({
  populate: {
    image: { fields: ["url", "alternativeText"] },
    role: { fields: ["name"] },
    consultant: { populate: "*" },
    client: { populate: "*" },
  },
});
const queryMiddleware = qs.stringify({
  populate: {
    role: { fields: ["name"] },
    consultant: { populate: "*" },
  },
});

// Cache to store responses
const responseCache = new Map();

// Function to generate a cache key
const getCacheKey = (authToken, light) => `user_me_${authToken}_${light}`;

// Time constants (in milliseconds)
const CACHE_DURATION = 10000; // 10 seconds
const CONCURRENT_REQUEST_WINDOW = 200; // 200 milliseconds

// Helper function to create a response object
const createUserResponse = (ok, data, error) => {

  return { ok, data, error };
};
// export async function isJwtValid() {
//   try {
//     const token = await getAuthToken();
//     if (!token) {
//       return false;
//     }
//     const decoded = jwt.decode(token);
//     if (!decoded || !decoded.exp) {
//       return false;
//     }
//     const currentTime = Math.floor(Date.now() / 1000);
//     if (decoded.exp < currentTime) {
//       return false;
//     }
//     return true;
//   } catch (error) {
//     return false;
//   }
// }
export async function getUserMeLoader(light = false, noCache = false) {
  const authToken = await getAuthToken();
  if (!authToken) {
    return createUserResponse(false, null, "authToken Is Null!");
  }
  const cacheKey = getCacheKey(authToken, light);
  const now = Date.now();
  if (!noCache) {
    const headersList = headers();
    // Get user data from headers
    const userDataString = headersList.get("x-user-data");
    if (userDataString && userDataString.length > 0) {
      const userData = JSON.parse(userDataString);

      if (userData.ok) {
        return createUserResponse(true, userData, null);
      }
    }


    // Check if there's a cached response
    if (responseCache.has(cacheKey)) {
      const cachedData = responseCache.get(cacheKey);
      if (now - cachedData.timestamp < CACHE_DURATION) {
        return cachedData.response;
      }
    }

    // Check if there's a pending request
    if (responseCache.has(`${cacheKey}_pending`)) {
      const pendingData = responseCache.get(`${cacheKey}_pending`);
      if (now - pendingData.timestamp < CONCURRENT_REQUEST_WINDOW) {
        // Wait for the pending request to complete
        return new Promise((resolve) => {
          const checkCache = () => {
            if (responseCache.has(cacheKey)) {
              resolve(responseCache.get(cacheKey).response);
            } else {
              setTimeout(checkCache, 10);
            }
          };
          checkCache();
        });
      }
    }

    // Set pending flag
    responseCache.set(`${cacheKey}_pending`, { timestamp: now });
  }
  const baseUrl = getPrivateStrapiURL();
  const url = new URL("/api/users/me", baseUrl);
  url.search = light ? queryMiddleware : query;

  try {
    const res = await fetchData(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    },
      true, false);

    let response;
    if (res) {
      if (res.status !== 200) {
        response = createUserResponse(false, null, res.error);
      } else if (res.status === 401) {
        response = createUserResponse(false, null, "401: Unauthorized!");
      } else {
        response = createUserResponse(true, res.data, null);
      }
    } else {
      response = createUserResponse(false, null, "401: Unauthorized!");
    }

    // Cache the response
    responseCache.set(cacheKey, { response, timestamp: now });
    responseCache.delete(`${cacheKey}_pending`);

    return response;
  } catch (error) {

    const response = createUserResponse(false, null, error);

    // Cache the error response
    responseCache.set(cacheKey, { response, timestamp: now });
    responseCache.delete(`${cacheKey}_pending`);

    return response;
  }
}