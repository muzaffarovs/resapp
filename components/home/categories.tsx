"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Resources = {
  name: string;
  href: string;
  src: string;
};

const resources: Resources[] = [
  {
    name: "Videos",
    href: "/videos",
    src: "/video.png",
  },
  {
    name: "Books",
    href: "/books",
    src: "/book.png",
  },
  {
    name: "Blog",
    href: "/blog",
    src: "/blog.png",
  },
];

const Categories = () => {
  return (
    <section
      id="categories"
      className="h-full w-full md:w-[calc(100%-4rem)] max-w-7xl md:border border-gray-700 md:rounded-xl z-20 mx-auto"
    >
      <div className="bg-transparent md:bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white rounded-xl p-6">
        <h2 className="text-2xl mb-10 text-center md:text-left font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Categories
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10">
          {resources.map((item, index) => (
            <li
              className="border mx-auto border-gray-700 w-fit rounded-lg hover:border-text-purple-400 hover:border-2 transition-all hover:text-purple-400 hover:scale-105 bg-gradient-to-b from-gray-900 via-gray-800 to-black"
              key={index}
            >
              <Link className="w-fit" href={item.href}>
                <div className="p-5 w-fit">
                  <p className="text-xl">{item.name}</p>
                  <Image
                    width={500}
                    height={500}
                    className="w-full"
                    src={item.src}
                    alt=""
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
