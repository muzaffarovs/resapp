"use client";
import Categories from "@/components/home/categories";
import Hero from "@/components/home/hero";
import React from "react";

const page = () => {
  return (
    <div className="relative h-full md:pt-24 bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-opacity-80 py-10 grid gap-10 scroll-smooth">
      <Hero />
      <Categories />
    </div>
  );
};

export default page;
