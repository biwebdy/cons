"use server";
import { getPrivateStrapiURL } from "./common/serverVariable";
import { fetchData } from "./common/utils";

const baseUrl = getPrivateStrapiURL();
export async function forgotPassword(email) {
    const url = new URL("/api/users/forgot-password", baseUrl);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
        }),
    };
    return await fetchData(url.href, options, true, false);
}

export async function verifyOtp(otp, email) {
    const url = new URL("/api/users/verify-otp", baseUrl);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            otp: otp,
        }),
    };
    return await fetchData(url.href, options, true, false);
}

export async function resetPassword(resetToken, password) {
    const url = new URL("/api/users/reset-password", baseUrl);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            resetToken,
            password,
        }),
    };
    return await fetchData(url.href, options, true, false);
}