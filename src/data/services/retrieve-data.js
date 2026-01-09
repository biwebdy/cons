import { getPrivateStrapiURL } from "../common/serverVariable";
import { fetchData } from "../common/utils";
import { getAuthToken } from "./token";

export async function retrieveData(method, path, payload) {
  const baseUrl = getPrivateStrapiURL();
  const authToken = await getAuthToken();
  const url = new URL(path, baseUrl);

  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetchData(url.href, {
      method: method,
      body: JSON.stringify({ ...payload }),
    });
    return response;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
