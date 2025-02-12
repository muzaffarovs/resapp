"use client";
import Hero from "@/components/home/hero";
import React from "react";

const page = () => {
  return (
    <div className="h-screen md:pt-24 md:pb-24 bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-opacity-80 md:py-9 grid gap-10 scroll-smooth">
      <Hero />
      {/* <Categories /> */}
    </div>
  );
};

export default page;
