import List from "@/components/blog/list";
import React from "react";

const page = () => {
  return (
    <section className=" w-full min-h-screen md:pt-24 bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-opacity-80 py-10 grid gap-10 scroll-smooth">
      <List />
    </section>
  );
};

export default page;
