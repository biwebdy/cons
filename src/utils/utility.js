const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function handleImgResponse(image) {
  if (image?.url) {
    return process.env.NEXT_PUBLIC_URL + image?.url;
  }
  return "";
}
export function getPublicStrapiURL() {
  return process.env.NEXT_PUBLIC_URL ?? "http://127.0.0.1:1337";
}
export function formatDateForDisplay(dateString) {
  if (dateString) {
    const dateParts = dateString?.split("-");
    const year = dateParts[0];
    const month = monthsShort[parseInt(dateParts[1], 10) - 1];
    return `${month} ${year}`;
  }
}

export function formatDateWithDaysDisplay(dateString) {
  if (dateString) {
    const dateParts = dateString?.split("-");
    const year = dateParts[0];
    const month = monthsShort[parseInt(dateParts[1], 10) - 1];
    const day = dateParts[2];
    return `${day} ${month} ${year}`;
  }
}

export function formatStrapiDate(dateString) {
  if (dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
}