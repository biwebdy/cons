"use server";
import qs from "qs";
import { getPrivateStrapiURL } from "./common/serverVariable";
import { fetchData } from "./common/utils";

const baseUrl = getPrivateStrapiURL();

export async function postData(formData) {
  const url = new URL("/api/clients/create", baseUrl);

  let options = {
    method: "POST",
    body: formData,
  };

  try {
    const result = await fetchData(url.href, options);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function postSubClientData(formData) {
  const url = new URL("/api/clients/create", baseUrl);
  let options = {
    method: "POST",
    body: JSON.stringify({ clientData: formData }),
  };

  try {
    const result = await fetchData(url.href, options);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function updateData(formData, id) {
  const url = new URL("/api/clients/" + id, baseUrl);
  let options = {
    method: "PUT",
    body: formData,
  };

  try {
    const result = await fetchData(url.href, options);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function deleteClient(id) {
  const url = new URL("/api/clients/" + id, baseUrl);
  let options = {
    method: "DELETE",
  };

  try {
    const result = await fetchData(url.href, options);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function getCompaniesData() {
  const url = new URL("/api/clients", baseUrl);
  url.search = qs.stringify({
    populate: {
      logo: true,
      attachment: true,
      canton: true,
      parentClient: true,
    },
    sort: {
      id: "desc",
    },
  });

  return await fetchData(url.href);
}

export async function getSingleCompanyData(id) {
  const url = new URL("/api/clients/" + id, baseUrl);
  url.search = qs.stringify(
    {
      populate: ["logo", "attachment", "canton"],
    },

  );

  return await fetchData(url.href);
}

export async function getSubClientsData(id, currentPage, itemsPerPage = 10) {
  const url = new URL("/api/clients/sub/" + id, baseUrl);
  url.search = qs.stringify({
    populate: {
      logo: true,
      attachment: true,
      canton: true,
    },
    pagination: {
      page: currentPage,
      pageSize: itemsPerPage,
    },
  });

  return await fetchData(url.href);
}

export async function getClientNotifications(id) {
  const url = new URL("/api/client/notifications/" + id, baseUrl);
  return await fetchData(url.href);
}

export async function getSubClientData(id) {
  const url = new URL("/api/client/sub-client/" + id, baseUrl);
  return await fetchData(url.href);
}
export async function updateSubClientData(id, formData) {
  const url = new URL("/api/client/sub-client/" + id, baseUrl);
  let options = {
    method: "PUT",
    body: JSON.stringify({ clientData: formData }),
  };

  try {
    const result = await fetchData(url.href, options);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function toggleActivation(id, action) {
  const url = new URL("/api/users/l4/" + id + "/toggle-activation", baseUrl);
  let options = {
    method: "POST",
    body: JSON.stringify({
      action: action,
    }),
  };

  try {
    const result = await fetchData(url.href, options);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function getRegisteredClients() {
  const url = new URL("/api/client-registration-forms", baseUrl);
  return await fetchData(url.href);
}
