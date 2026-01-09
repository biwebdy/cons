export function getPrivateStrapiURL() {
    return process.env.STRAPI_URL ?? "http://127.0.0.1:1337";
}
export function getFrontEndURL() {
    return process.env.FRONT_END_URL ?? "http://127.0.0.1:3000";
}