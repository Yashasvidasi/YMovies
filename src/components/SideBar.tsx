"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function SideBar() {
  const [show, setshow] = useState(false);
  const router = useRouter();
  const [nid, setnid] = useState("");
  const pathname = usePathname();

  const fetchData = async () => {
    console.log("herherherhehrehr");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `/api/gettoken2?cachebuster=${new Date().getTime()}`,
      options
    );
    console.log(response);
    const data = await response.json();

    if (data.id !== "not_logged_in") router.push(`/user/${data.id}`);
    else router.push("/login");
  };

  const handlepress = async () => {};

  const handleshow = () => {
    setshow(!show);
  };

  return (
    <div className="min-h-screen min-w-20 bg-transparent flex flex-col  justify-between border-white">
      <div className="flex flex-col">
        <div
          onClick={() => {
            pathname !== "/home" ? router.push("/home") : null;
          }}
          className="self-center rounded-full mt-4"
        >
          <img src="/assets/logo.png" className="w-11 h-11" />
        </div>
        <div
          onClick={() => {
            pathname !== "/search" ? router.push("/search") : null;
          }}
          className="self-center rounded-full mt-6"
        >
          <img src="/assets/search.png" className="w-8 h-8" />
        </div>
        <div
          onClick={() => {
            pathname !== "/filter" ? router.push("/filter") : null;
          }}
          className="self-center rounded-full mt-6"
        >
          <img src="/assets/slider.png" className="w-8 h-8" />
        </div>
      </div>
      <div className="flex flex-col mb-10">
        {show ? (
          <div className="flex flex-col mt-6 mr-0.5 bg-slate-300 p-4 w-fit self-center rounded-xl">
            <div className="self-center rounded-full mr-0.5">
              <img src="/assets/facebook.png" className="6 h-6" />
            </div>
            <div className="self-center rounded-full mt-6 mr-0.5">
              <img src="/assets/insta.png" className="6 h-6" />
            </div>
            <div className="self-center rounded-full mt-6 mr-0.5">
              <img src="/assets/whatsapp.png" className="6 h-6" />
            </div>
          </div>
        ) : null}
        <div
          onClick={handleshow}
          className="self-center hover:cursor-pointer rounded-full mt-6 mr-0.5"
        >
          <img src="/assets/share.png" className="w-8 h-8" />
        </div>
        <div
          onClick={() => {
            fetchData();
          }}
          className="self-center rounded-full mt-6 p-2 border-2 border-white"
        >
          <img src="/assets/user.png" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
