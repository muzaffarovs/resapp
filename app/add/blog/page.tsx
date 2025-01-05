import AddBlog from "@/components/add/blog";
import React from "react";

const page = () => {
  return (
    <div className="relative h-screen md:pt-24 bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-opacity-80 py-10 grid gap-10 scroll-smooth">
      <section className="h-fit w-full md:w-[calc(100%-4rem)] max-w-7xl md:border border-gray-700 md:rounded-xl z-20 mx-auto">
        <div className="bg-transparent md:bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-16 rounded-xl">
          <div className="max-w-7xl mx-auto px-6 grid text-center">
            <div className="w-[50%] mx-auto">
              <h2 className="block mb-5">Add new blog</h2>
              <AddBlog />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
