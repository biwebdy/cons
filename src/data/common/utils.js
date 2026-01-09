"use server";
import { flattenAttributes } from "@/lib/utils";
import { deleteCookie, getAuthToken, getCookie, hasAuthToken } from "../services/token";

if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export async function fetchData(url, options, isFlattenAttributes = true, enableAuth = true) {
  const hasToken = await hasAuthToken();
  if (!hasToken && enableAuth) {
    //for loggin enabel the trace
    //console.trace("No JWT token found. Skipping request.");
    return;
  }
  // Apply backend suffix if available
  const urlSuffix = process.env.BACKEND_SUFFIX ?? "";
  if (urlSuffix && urlSuffix.length > 0) {
    const [base, path] = url.split("/api");
    url = `${base}${urlSuffix}/api${path}`;
  }

  const defaultOptions = {
    method: "GET",
    cache: "no-store",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  if (!(options?.body instanceof FormData)) {
    finalOptions.headers = {
      ...finalOptions.headers,
      "Content-Type": "application/json",
    };
  }

  if (enableAuth) {
    const jwt = await getCookie('jwt');

    if (jwt) {
      finalOptions.headers = {
        ...finalOptions.headers,
        Authorization: `Bearer ${jwt}`,
        'X-Requested-With': 'XMLHttpRequest',
      };
    } else {
      console.trace("NOT USING JWT. Authentication might fail.");
    }
  }

  try {
    const response = await fetch(url, finalOptions);


    const data = await response.json();
    if (isFlattenAttributes && ["PUT", "POST", "GET"].includes(finalOptions.method || '')) {
      const f = flattenAttributes(data);
      if (!f) {
        delete data?.error?.details;
        return { ...data.error };
      }
      return f;
    }

    const d = data === null ? { data: null } : data;
    return d;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      await deleteCookie('jwt');
      console.warn("Deleted JWT cookie", error.name);
    }
    throw error;
  }
}