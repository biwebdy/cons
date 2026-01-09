import { getPrivateStrapiURL } from "./common/serverVariable";
import { fetchData } from "./common/utils";
const baseUrl = getPrivateStrapiURL();
export async function getAdminNotifications() {

    const url = new URL("/api/admin/notifications", baseUrl);
    return await fetchData(url.href);
}
