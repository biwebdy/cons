"use server";
import qs from "qs";
import { getPrivateStrapiURL } from "./common/serverVariable";
import { fetchData } from "./common/utils";

const baseUrl = getPrivateStrapiURL();

export async function postMessage(formData) {
  const url = new URL("/api/messages", baseUrl);

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: formData }),
  };

  try {
    const result = await fetchData(url.href, options);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function getMessagesData(page = 1, pageSize, filters = {}) {
  const url = new URL("/api/messages", baseUrl);
  url.search = qs.stringify({
    pagination: {
      page,
      pageSize,
    },
  });

  return await fetchData(url.href);
}
