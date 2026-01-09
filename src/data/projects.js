"use server";
import qs from "qs";

import { getPrivateStrapiURL } from "./common/serverVariable";
import { fetchData } from "./common/utils";
import { getUserMeLoader } from "./services/get-user-me-loader";
const baseUrl = getPrivateStrapiURL();

export async function getConsultantProjectsData(
    page = 1,
    pageSize,
    sort = {},
) {
    const url = new URL("/api/projects", baseUrl);
    const user = await getUserMeLoader();
    url.search = qs.stringify(
        {
            populate: ["client", "consultant", "offer", "client.logo"],
            pagination: {
                page,
                pageSize,
            },
            filters: {
                consultant: user?.data?.consultant.id,
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

export async function getClientProjectsByStatus(page = 1, pageSize, id, status, notStatus = false) {
    const url = new URL("/api/projects", baseUrl);
    url.search = qs.stringify(
        {
            populate: ["client", "consultant", "client.logo", "consultant.profilePicture", "offer"],
            pagination: {
                page,
                pageSize,
            },
            filters: {
                client: id,
                status: notStatus ? { $ne: status } : { $eq: status },
            },
            sort: {
                createdAt: "desc",
            },
        },
        { encode: false },
    );

    const reponse = await fetchData(url.href);
    return reponse;
}



export async function getClientProjectsData(page = 1, pageSize, sort = {}, id) {
    const url = new URL("/api/projects", baseUrl);
    const user = await getUserMeLoader();

    url.search = qs.stringify(
        {
            populate: ["client", "consultant", "client.logo", "consultant.profilePicture", "offer"],
            pagination: {
                page,
                pageSize,
            },
            filters: {
                client: user?.data?.client?.id,
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


export async function getProjectsData(page = 1, pageSize, sort = {}) {
    const url = new URL("/api/projects", baseUrl);
    url.search = qs.stringify(
        {
            populate: ["client", "consultant", "offer"],
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


    const reponse = await fetchData(url.href);
    return reponse;
}

export async function getProjectData(id) {
    const url = new URL(`/api/projects/${id}`, baseUrl);
    url.search = qs.stringify(
        {
            populate: [
                "client",
                "client.logo",
                "consultant",
                "consultant.profilePicture",
                "offer",
                "offer.proposal",
                "offer.proposal.missionContract",
                "offer.offerContract"
            ],
        },
        { encode: false },
    );

    return await fetchData(url.href);
}

export async function getTimesheet(month, year, project, isCons) {
    const url = new URL(`/api/timesheets`, baseUrl);
    const filtrs = !isCons ? {
        month: {
            $eq: month,
        },
        year: {
            $eq: year,
        },
        project: {
            $eq: project,
        },
        isSubmitted: {
            $eq: true,
        },

    } : {
        month: {
            $eq: month,
        },
        year: {
            $eq: year,
        },
        project: {
            $eq: project,
        },
    }

    url.search = qs.stringify(
        {
            populate: ["workingDays", "project", "timesheetFile"],
            filters: filtrs
        },
        { encode: false },
    );

    return await fetchData(url.href);
}

export async function submitTimesheet(formData) {

    const url = new URL("/api/timesheets/", baseUrl);
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

export async function updateTimesheet(id, body) {

    const url = new URL("/api/timesheets/" + id, baseUrl);
    let options = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            body,
        }),
    };

    try {
        const result = await fetchData(url.href, options);

        return result;
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


export async function changeProjectStatus(id, status) {
    const url = new URL("/api/projects/" + id, baseUrl);
    let options = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: {
                status: status,
            },
        }),
    };

    try {
        const result = await fetchData(url.href, options);

        return result;
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
