import { getPublicStrapiURL } from "@/utils/utility";

function flattenStrapiObject(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(flattenStrapiObject);

  if (Array.isArray(obj) && obj.length === 0) return [];
  let flattened = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === "data") {
        if (Array.isArray(obj[key])) {
          flattened = obj[key].map((item) => flattenStrapiObject(item));
        } else if (typeof obj[key] === "object") {
          flattened = { ...flattened, ...flattenStrapiObject(obj[key]) };
        }
      } else if (key === "attributes") {
        const attributes = flattenStrapiObject(obj[key]);
        flattened = { ...flattened, ...attributes };
      } else {
        flattened[key] = flattenStrapiObject(obj[key]);
      }
    }
  }

  return flattened;
}

export function flattenAttributes(response) {
  // if (response.status && response.data) response = response.data;
  if (!response || !response.data) return null;

  const result = {};

  // Retain meta and any other top-level keys
  for (const key in response) {
    if (key !== "data") {
      result[key] = response[key];
    }
  }

  // Handle data as both an array and an object
  if (Array.isArray(response.data)) {
    result.data = response.data.map((item) => {
      const flattenedItem = flattenStrapiObject(item);
      return {
        id: item.id,
        ...flattenedItem,
      };
    });
  } else if (typeof response.data === "object") {
    result.data = {
      id: response.data.id,
      ...flattenStrapiObject(response.data),
    };
  }
  return result;
}

export function getStrapiMedia(url) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getPublicStrapiURL()}${url}`;
}

export function extractYouTubeID(urlOrID) {
  // Regular expression for YouTube ID format
  const regExpID = /^[a-zA-Z0-9_-]{11}$/;

  // Check if the input is a YouTube ID
  if (regExpID.test(urlOrID)) {
    return urlOrID;
  }

  // Regular expression for standard YouTube links
  const regExpStandard = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

  // Regular expression for YouTube Shorts links
  const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;

  // Check for standard YouTube link
  const matchStandard = urlOrID.match(regExpStandard);
  if (matchStandard) {
    return matchStandard[1];
  }

  // Check for YouTube Shorts link
  const matchShorts = urlOrID.match(regExpShorts);
  if (matchShorts) {
    return matchShorts[1];
  }

  // Return null if no match is found
  return null;
}

export function removeIdField(obj) {
  if (Array.isArray(obj)) {
    return obj.map(removeIdField);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      if (key !== "id") {
        acc[key] = removeIdField(obj[key]);
      }
      return acc;
    }, {});
  }
  return obj;
}
