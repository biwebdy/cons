"use server";
import qs from "qs";
import { fetchData } from "./common/utils";
import { getPrivateStrapiURL } from "./common/serverVariable";
import { getUserMeLoader } from "./services/get-user-me-loader";
import { revalidatePath } from "next/cache";

const baseUrl = getPrivateStrapiURL();

export async function createProposal(formData) {
  const url = new URL("/api/proposals", baseUrl);
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: formData,
    }),
  };

  try {
    return await fetchData(url.href, options);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function updateData(formData, id) {
  const url = new URL("/api/proposals/" + id, baseUrl);
  let options = {
    method: "PUT",
    body: formData,
  };

  try {
    return await fetchData(url.href, options);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function getAdminProposalsData(
  page = 1,
  pageSize,
  sort = {},
) {
  const url = new URL("/api/proposals", baseUrl);
  const user = await getUserMeLoader();
  url.search = qs.stringify(
    {
      populate: [
        "client",
        "consultant",
        "offer",
        "missionContract",
        "client.logo",
        "consultant.profilePicture",
        "consultant.preferences",
      ],
      pagination: {
        page,
        pageSize,
      },
      sort: {
        ...sort,
      },
    },
    { encode: false },
  );

  return await fetchData(url.href);
}



export async function getProposalsData(
  page = 1,
  pageSize,
  sort = {},
) {
  const url = new URL("/api/proposals", baseUrl);
  const user = await getUserMeLoader();
  url.search = qs.stringify(
    {
      populate: [
        "client",
        "consultant",
        "offer",
        "missionContract",
        "client.logo",
        "consultant.profilePicture",
        "consultant.preferences",
      ],
      pagination: {
        page,
        pageSize,
      },
      filters: {
        consultant: { id: user?.data?.consultant.id },
      },
      sort: {
        ...sort,
      },
    },
    { encode: false },
  );

  return await fetchData(url.href);
}

export async function acceptRejectProposal(id, body) {

  const url = new URL("/api/proposals/cons/" + id, baseUrl);
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    return await fetchData(url.href, options);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function signMissionContract(id) {
  const url = new URL("/api/proposals/sign/" + id, baseUrl);
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "SigningStartedByConsultant",
    }),
  };

  try {
    return await fetchData(url.href, options);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function completeSignMissionContract(id = 0) {
  // id will be ignored and fetched from the user
  const url = new URL("/api/proposals/sign/" + id, baseUrl);
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      envelopeId: "ENVELOPE_ID",
      status: "SigningCompletedByConsultant",
    }),
  };

  try {
    const resp = await fetchData(url.href, options);
    revalidatePath('/consultant-personalized');
    return resp;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}


export async function getClientProposalsData(page = 1, pageSize, sort = {}, id) {
  const url = new URL("/api/proposals", baseUrl);
  url.search = qs.stringify(
    {
      populate: ["client", "consultant", "client.logo", "consultant.profilePicture"],
      pagination: {
        page,
        pageSize,
      },
      filters: {
        client: id,
      },
      sort: {
        ...sort,
      },
    },
    { encode: false },
  );


  const reponse = await fetchData(url.href);
  return reponse;
}

export async function getSubClientsProposals(id, status) {
  const url = new URL("/api/proposals/sub/" + id, baseUrl);
  url.search = qs.stringify(
    {
      populate: ["client", "consultant", "client.logo", "consultant.profilePicture"],
      filters: {
        status: {
          $in: status,
        },
      },
      sort: {
        createdAt: "desc",
      },
    },
    { encode: false },
  );
  return await fetchData(url.href);
}

export async function getClientProposalsByStatus(page = 1, pageSize, id, status) {
  const url = new URL("/api/proposals", baseUrl);
  url.search = qs.stringify(
    {
      populate: ["client", "consultant", "client.logo", "consultant.profilePicture"],
      pagination: {
        page,
        pageSize,
      },
      filters: {
        status: {
          $in: status,
        },
        client: id,
      },
      sort: {
        createdAt: "desc",
      },
    },
    { encode: false },
  );

  return await fetchData(url.href);
}


export async function getProposal(id) {

  const url = new URL("/api/proposals/" + id, baseUrl);

  url.search = qs.stringify(
    {
      populate: [
        "client",
        "consultant",
        "offer",
        "missionContract",
        "client.logo",
        "consultant.profilePicture",
        "client.parentClient",
        "consultant.preferences",
      ],
    },
    { encode: false },
  );

  return await fetchData(url.href);

}

export async function approveProposalL3(id, status) {
  const url = new URL("/api/proposals/" + id + "/l3-approval", baseUrl);
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: status,
    }),
  };

  return await fetchData(url.href, options);
}


export async function createSubClientProposal(formData) {
  const url = new URL("/api/proposals/sub-client", baseUrl);
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: formData,
    }),
  };

  return await fetchData(url.href, options);
}


