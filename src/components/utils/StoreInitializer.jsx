'use client'
import useUserStore from "@/store/userStore";

export function StoreInitializer({ user }) {
    useUserStore.setState({ user: user.data });
    return null;
}