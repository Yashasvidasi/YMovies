"use client";

import { useState } from "react";
import LoginPage from "./LoginPage";
import SignInPage from "./SignInPage";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [login, setlogin] = useState(true);
  return (
    <main className="flex h-screen flex-row items-center justify-between p-5 ">
      <div className="hidden md:flex flex-col justify-center w-1/2  h-full">
        <img src="/assets/poster.jpg" className="w-full h-full" />
      </div>

      {/* Column 2 (full width on mobile, half width on medium and larger) */}
      <div className="flex flex-col w-full md:w-1/2  justify-center min-h-full">
        <Toaster />
        <div>
          <img src="/assets/poster.png" className="w-full h-full" />
        </div>
        {login ? (
          <LoginPage setlogin={setlogin} />
        ) : (
          <SignInPage setlogin={setlogin} />
        )}
      </div>
    </main>
  );
}
