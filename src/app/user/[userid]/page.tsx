"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { UserProvider } from "./UserContext";
import InnerContainer from "./InnerContainer";

const page = ({ params }: { params: any }) => {
  return <InnerContainer params={params.userid} />;
};

export default page;
