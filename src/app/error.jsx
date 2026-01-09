"use client";
import PageNotFound from "@/components/section/PageNotFound";
import { useEffect } from "react";

export default function Error({ error }) {
  useEffect(() => {
    // alert("Check Console!,An error occurred");
    console.error(error);
  }, [error]);
  //TODO maybe to have a custom error page
  return <PageNotFound />;
}
