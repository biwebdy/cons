"use server";
import { revalidatePath } from "next/cache";
import qs from "qs";
import { getPrivateStrapiURL } from "./common/serverVariable";
import { fetchData } from "./common/utils";
import { getAuthToken } from "./services/token";

const baseUrl = getPrivateStrapiURL();

export async function getOffersData(page = 1, pageSize, sort = {}, id) {
  const url = new URL("/api/offers", baseUrl);
  const searchParams = id
    ? {
      populate: [
        "proposal",
        "proposal.client",
        "proposal.consultant",
        "proposal.missionContract",
        "proposal.client.logo",
        "proposal.consultant.profilePicture",
        "offerContract",
        "purchaseOrder",
      ],
      pagination: {
        page,
        pageSize,
      },
      filters: {
        proposal: {
          client: id,
        },
      },
      sort: {
        ...sort,
      },
    }
    : {
      populate: [
        "proposal",
        "proposal.client",
        "proposal.consultant",
        "proposal.offer",
        "proposal.missionContract",
        "proposal.client.logo",
        "proposal.consultant.profilePicture",
        "offerContract",
        "purchaseOrder",
      ],
      pagination: {
        page,
        pageSize,
      },

      sort: {
        ...sort,
      },
    };

  url.search = qs.stringify(searchParams, { encode: false });

  return await fetchData(url.href);
}

export async function getOffersByStatus(page = 1, pageSize, id, status, notStatus = false) {
  const url = new URL("/api/offers", baseUrl);
  const searchParams = notStatus
    ? {
      populate: [
        "proposal",
        "proposal.client",
        "proposal.consultant",
        "proposal.missionContract",
        "proposal.client.logo",
        "proposal.consultant.profilePicture",
        "offerContract",
        "purchaseOrder",
      ],
      pagination: {
        page,
        pageSize,
      },
      filters: {
        proposal: {
          client: id,
        },
        status: {
          $ne: status
        },
      },
      sort: {
        createdAt: "desc",
      },
    }
    : {
      populate: [
        "proposal",
        "proposal.client",
        "proposal.consultant",
        "proposal.missionContract",
        "proposal.client.logo",
        "proposal.consultant.profilePicture",
        "offerContract",
        "purchaseOrder",
      ],
      pagination: {
        page,
        pageSize,
      },
      filters: {
        proposal: {
          client: id,
        },
        status: {
          $eq: status
        },
      },
      sort: {
        createdAt: "desc",
      },
    }

  url.search = qs.stringify(searchParams, { encode: false });

  return await fetchData(url.href);
}

export async function getFullOffersByClientId(clientId, page = 1, pageSize, status, notStatus = false) {
  const url = new URL("api/offers/client-sub/" + clientId, baseUrl);
  const searchParams = notStatus
    ? {
      populate: [
        "proposal",
        "proposal.client",
        "proposal.consultant",
        "proposal.missionContract",
        "proposal.client.logo",
        "proposal.consultant.profilePicture",
        "offerContract",
        "purchaseOrder",
      ],
      pagination: {
        page,
        pageSize,
      },
      filters: {

        status: {
          $notIn: status
        },
      },
      sort: {
        createdAt: "desc",
      },
    }
    : {
      populate: [
        "proposal",
        "proposal.client",
        "proposal.consultant",
        "proposal.missionContract",
        "proposal.client.logo",
        "proposal.consultant.profilePicture",
        "offerContract",
        "purchaseOrder",
      ],
      pagination: {
        page,
        pageSize,
      },
      filters: {

        status: {
          $in: status
        },
      },
      sort: {
        createdAt: "desc",
      },
    }
  url.search = qs.stringify(searchParams, { encode: false });

  return await fetchData(url.href);
}


export async function getOfferById(id) {
  const url = new URL("/api/offers/" + id, baseUrl);
  const searchParams =
  {
    populate: [
      "proposal",
      "proposal.client",
      "proposal.consultant",
      "proposal.missionContract",
      "proposal.client.logo",
      "proposal.consultant.profilePicture",
      "offerContract",
      "purchaseOrder"
    ],
  }

  url.search = qs.stringify(searchParams, { encode: false });

  return await fetchData(url.href);

}

export async function updateOffer(id, body) {
  const url = new URL("/api/offers/client/" + id, baseUrl);
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const auth = await getAuthToken();
    const result = await fetchData(url.href, options);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}



export async function updateOfferByAdmin(id, body) {
  const url = new URL("/api/offers/admin/" + id, baseUrl);
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const result = await fetchData(url.href, options);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}


export async function updateOfferWithFile(formData, offerID) {
  const url = new URL("/api/offers/client/" + offerID, baseUrl);
  const options = {
    method: "PUT",
    body: formData,
  };

  return await fetchData(url.href, options);
}
export async function signOffer(id) {
  const url = new URL("/api/offers/sign/" + id, baseUrl);
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "SigningStartedByClient",
    }),
  };

  try {
    const result = await fetchData(url.href, options);

    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function signCompleteOffer(id = 0) {
  // id will be ignored and fetched on the server
  const url = new URL("/api/offers/sign/" + id, baseUrl);
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "SigningCompletedByClient",
      envelopeId: "ENVELOPE_ID",
    }),
  };

  try {
    const result = await fetchData(url.href, options);
    revalidatePath('/client-personalized');
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
