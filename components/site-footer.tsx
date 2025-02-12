"use client";
import { useTab } from "@/contexts/TabContext";
import {
  BookOpenText,
  ChartNoAxesCombinedIcon,
  FileVideo2,
  Home,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const SiteFooter = ({ className = "" }: { className?: string }) => {
  const { setActiveTab } = useTab();
  return (
    <div
      className={`px-[2rem] md:mb-1 md:px-6 fixed w-full md:w-[calc(100%-4rem)] max-w-7xl bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-opacity-80 backdrop-blur-lg py-4 md:rounded-xl border border-gray-700 shadow-2xl text-white ${className}`}
    >
      <div className="w-full flex justify-between">
        <Link href="/" onClick={() => setActiveTab("home")}>
          <Home />
        </Link>
        <Link href="/videos" onClick={() => setActiveTab("video")}>
          <FileVideo2 />
        </Link>
        <Link href="/books" onClick={() => setActiveTab("book")}>
          <BookOpenText />
        </Link>
        <Link href="/blog" onClick={() => setActiveTab("blog")}>
          <ChartNoAxesCombinedIcon />
        </Link>
      </div>
    </div>
  );
};

export default SiteFooter;
