"use server";
import qs from "qs";
import { getPrivateStrapiURL } from "./common/serverVariable";
import { fetchData } from "./common/utils";
import { getUserMeLoader } from "./services/get-user-me-loader";
import { revalidatePath } from "next/cache";

const baseUrl = getPrivateStrapiURL();

export async function postData(formData) {
  const url = new URL("/api/consultants/create", baseUrl);
  const options = {
    method: "POST",
    body: formData,
  };

  return await fetchData(url.href, options, true, false);
}

export async function updateData(formData, id) {
  const url = new URL("/api/consultants/" + id, baseUrl);
  const options = {
    method: "PUT",
    body: formData,
  };

  return await fetchData(url.href, options);
}

export async function fillData(consData) {
  const url = new URL("/api/consultants/fill", baseUrl);
  const options = {
    method: "POST",
    body: JSON.stringify({ consultantData: consData }),
  };

  return await fetchData(url.href, options);
}

export async function getconsultantsData(
  page = 1,
  pageSize,
  filters = {},
  sort = {},
  shouldProfileBeCompleted = false,
) {
  const url = new URL("/api/consultants", baseUrl);

  const preferencesFilters = {};
  if (filters?.preferences?.skills && filters.preferences.skills.length > 0) {
    preferencesFilters.skills = { $in: filters.preferences.skills };
  }
  if (
    filters?.preferences?.industries &&
    filters.preferences.industries.length > 0
  ) {
    preferencesFilters.industries = { $in: filters.preferences.industries };
  }
  if (filters?.preferences?.preferredLocationOfWork) {
    preferencesFilters.preferredLocationOfWork = {
      $in: filters.preferences.preferredLocationOfWork,
    };
  }
  if (filters?.preferences?.rate) {
    preferencesFilters.rate = { $lte: filters.preferences.rate };
  }
  if (filters?.preferences?.daysAvailable) {
    preferencesFilters.daysAvailable = {
      $gte: filters.preferences.daysAvailable,
    };
  }
  if (filters?.preferences?.availableDate) {
    preferencesFilters.availableDate = {
      $lte: filters.preferences.availableDate,
    };
  }
  if (filters?.preferences?.cantons && filters.preferences.cantons.length > 0) {
    preferencesFilters.preferredLocationOfWork = {
      $in: filters.preferences.cantons,
    };
  }

  // Create the main filters object
  const mainFilters = {
    ...(shouldProfileBeCompleted ? { profileCompleted: true } : {}),
    ...(Object.keys(preferencesFilters).length > 0 ? { preferences: preferencesFilters } : {}),
  };

  // Add seniority level filter at the root level
  if (filters.preferences?.seniorityLevel && filters.preferences.seniorityLevel.length > 0) {
    const seniorityRanges = filters.preferences.seniorityLevel.map(level => {
      switch (level) {
        case 'junior':
          return [1, 2, 3];
        case 'mid':
          return [4, 5, 6];
        case 'senior':
          return [7, 8, 9, 10];
        default:
          return [];
      }
    }).flat();

    if (seniorityRanges.length > 0) {
      mainFilters.seniorityLevel = {
        $in: seniorityRanges
      };
    }
  }

  url.search = qs.stringify(
    {
      populate: [

        "attachment",
        "bankingInfo",
        "languages",
        "education",
        "preferences",
        "preferences.locations",
        "preferences.industries",
        "preferences.skills",
        "preferences.availableDate",
        "preferences.preferredLocationOfWork",
      ],
      pagination: { page, pageSize },
      filters: mainFilters,
      sort: { ...sort },
    },
    { encodeValuesOnly: true },
  );

  return await fetchData(url.href);
}


export async function getConsultantByID(id) {
  const url = new URL("/api/consultants", baseUrl);
  url.search = qs.stringify(
    {
      populate: [
        "profilePicture",
        "preferences",
        "preferences.locations",
        "preferences.industries",
        "preferences.skills",
        "preferences.availableDate",
        "preferences.preferredLocationOfWork",
      ],
      filters: { consultant_id: id, profileCompleted: true }
    },
  );

  return await fetchData(url.href);
}



export async function getconsultantsDataByApprovalStatus(
  page = 1,
  pageSize,
  filters = {},
  sort = {},
) {
  const url = new URL("/api/consultants", baseUrl);
  url.search = qs.stringify(
    {
      populate: [
        "profilePicture",
        "attachment",
        "bankingInfo",
        "languages",
        "education",
        "preferences",
        "preferences.locations",
        "preferences.industries",
        "preferences.skills",
        "preferences.availableDate",
        "preferences.preferredLocationOfWork",
      ],
      pagination: { page, pageSize },
      filters: { approval: filters.approval },
      sort: { ...sort },
    },
    { encodeValuesOnly: true },
  );

  return await fetchData(url.href);
}



export async function getSingleConsultantData(id) {
  const url = new URL("/api/consultants/" + id, baseUrl);
  url.search = qs.stringify(
    {
      populate: [
        "profilePicture",
        "attachment",
        "bankingInfo",
        "languages",
        "education",
        "preferences",
        "preferences.locations",
        "preferences.industries",
        "preferences.skills",
        "preferences.availableDate",
        "preferences.preferredLocationOfWork",
        "preferences.seniorityLevel",
        "residencyPermit"
      ],
    },
    { encodeValuesOnly: true },
  );
  return await fetchData(url.href);
}


export async function getSingleConsultantDataByUserID(userId) {
  const url = new URL(`/api/consultants/by-user/${userId}`, baseUrl);
  return await fetchData(url.href);
}

export async function deleteConsultant(id) {
  const url = new URL("/api/consultants/" + id, baseUrl);
  const options = {
    method: "DELETE",
  };

  return await fetchData(url.href, options);
}

export async function signFramework(id) {
  const url = new URL("/api/consultants/sign", baseUrl);
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetchData(url.href, options);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function signFrameworkCompleted() {
  try {
    const url = new URL("/api/consultants/sign", baseUrl);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        envelopeId: "ENVELOPE_ID",
      }),
    };
    const result = await fetchData(url.href, options);

    revalidatePath("/edit-profile");
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}



export async function approveCons(formData, id) {
  const url = new URL("/api/consultants/" + id, baseUrl);
  const options = {
    method: "PUT",
    body: formData
  };

  return await fetchData(url.href, options);
}
