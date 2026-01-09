"use client";

import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";

export default function RegisteredClientDashboardCard({ data }) {
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer">
      <td className="px-6 py-4 whitespace-nowrap">{data?.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{data?.companyName}</td>

      <td className="px-6 py-4 whitespace-nowrap">{data?.email}</td>

      <td className="px-6 py-4 whitespace-nowrap">{data?.phoneNumber}</td>

      <td className="px-6 py-4 whitespace-nowrap">{data?.message}</td>
    </tr>
  );
}
