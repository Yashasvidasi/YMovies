"use client";
import HomePage from "./HomePage";
import SideBar from "@/components/SideBar";
import { AppProvider } from "@/app/AppContext";

export default function Home() {
  return (
    <AppProvider>
      <main className="flex flex-row min-h-screen overflow-hidden">
        <SideBar />
        <HomePage />
      </main>
    </AppProvider>
  );
}
