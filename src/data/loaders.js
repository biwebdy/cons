"use server";
import qs from "qs";
import { getPrivateStrapiURL } from "./common/serverVariable";
import { fetchData } from "./common/utils";

const baseUrl = getPrivateStrapiURL();

export async function getHomePageData() {
  const url = new URL("/api/home-page", baseUrl);

  url.search = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: {
            populate: true,
          },
          feature: {
            populate: true,
          },
        },
      },
    },
  });

  return await fetchData(url.href, null, true, false);
}

export async function getGlobalPageData() {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });

  return await fetchData(url.href, null, true, false);
}

export async function getPositionsData() {
  const url = new URL("/api/positions", baseUrl);
  const response = await fetchData(url.href, null, true, false);
  return response;
}

export async function getSkillsData() {
  const url = new URL("/api/skills", baseUrl);
  const response = await fetchData(url.href, null, true, false);
  return response;
}

export async function getIndustriesData() {
  const url = new URL("/api/industries", baseUrl);
  const response = await fetchData(url.href, null, true, false);
  return response;
}

export async function getLocationsData() {
  const url = new URL("/api/locations", baseUrl);
  const response = await fetchData(url.href, null, true, false);
  return response;
}

export async function getContonData() {
  const url = new URL("/api/cantons", baseUrl);
  url.searchParams.append("pagination[limit]", "30");
  const response = await fetchData(url.href, null, true, false);
  return response;
}

export const strapiLOV = async () => {

  const formatData = (result) => {

    const values = result.data
      ?.filter((item) => item.isActive)
      .map((item) => ({
        value: item.id,
        title: item.name,
      }));
    return values;
  };

  const [allSkills, allIndustries, cantons] = await Promise.all([
    getSkillsData(),
    getIndustriesData(),
    getContonData(),
  ]).catch((err) => {
    console.log(err);
  });

  return {
    skills: formatData(allSkills),
    industries: formatData(allIndustries),
    cantons: formatData(cantons),
  };
};
