"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { UserProvider } from "./UserContext";
import InnerContainer from "./InnerContainer";

const page = () => {
  return (
    <UserProvider>
      <InnerContainer />
    </UserProvider>
  );
};

export default page;
