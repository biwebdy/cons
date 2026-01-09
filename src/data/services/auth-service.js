"use server";
import { redirect } from "next/navigation";
import { getFrontEndURL, getPrivateStrapiURL } from "../common/serverVariable";
import { fetchData } from "../common/utils";
import { deleteCookie, getCookiesConfig, setCookie } from "./token";
import { cookies } from "next/headers";

const baseUrl = getPrivateStrapiURL();
export async function registerUserService(userData) {
  const url = new URL("/api/auth/local/register", baseUrl);

  try {
    const response = await fetchData(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });
    await setCookie('jwt', response.data.jwt);
    return response;
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

export async function loginUserService(userData) {
  const url = new URL("/api/auth/local", baseUrl);

  try {
    const response = await fetchData(url.href, {
      method: "POST",
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    }, false, false);

    if (response.data && response.data.jwt) {

      await setCookie('jwt', response.data.jwt);

    }
    return response;
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

export async function changePasswordService(currentPassword, newPassword) {
  const url = new URL("/api/users/change-password", baseUrl);

  try {
    const response = await fetchData(url.href, {
      method: "POST",
      body: JSON.stringify({
        currentPassword,
        password: newPassword,
        passwordConfirmation: newPassword,
      }),
      cache: "no-cache",
    }, false, true);

    return response;
  } catch (error) {
    console.error("Change Password Service Error:", error);
    throw error;
  }
}

export async function logoutAction() {
  try {
    const cookieStore = cookies();
    cookieStore.set('jwt', '', {
      ...getCookiesConfig(),
      maxAge: 0,
      expires: new Date(0)
    });
    const allCookies = cookieStore.getAll();
    for (const cookie of allCookies) {
      if (cookie.name.includes('auth') || cookie.name.includes('session')) {
        cookieStore.set(cookie.name, '', {
          maxAge: 0,
          expires: new Date(0),
          path: '/',
        });
      }
    }
    redirect(getFrontEndURL());
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
} 