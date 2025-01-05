"use client";
import { useStore } from "@/app/store/store";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export type Article = {
  updatedAt: number;
  title: string;
  description: string;
  _id: number;
};

const List = () => {
  const { isAdmin } = useStore();
  const [articles, setArticles] = useState<Article[]>();
  const [loading, setLoading] = useState<false | string>(false);
  const [error, setError] = useState<boolean | string>(false);

  const gmtToLocal = (gmt: number) => {
    return new Date(gmt.toLocaleString());
  };

  const fetchArticles = async () => {
    setLoading("Loading...");
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setArticles(data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setError("Error occured while loading the blogs");
      setLoading(false);
    }
  };

  const handleDelete = useCallback(async (id: number) => {
    setLoading("Deleting...");
    try {
      await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });
      setLoading(false);
      fetchArticles();
    } catch (error) {
      console.error("Failed to delete article:", error);
      setError("Error occured while deleting the blogs");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="h-fit w-full md:w-[calc(100%-4rem)] max-w-7xl md:border border-gray-700 md:rounded-xl z-20 mx-auto">
      <div className="bg-transparent md:bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white rounded-xl px-6 py-10">
        <h2 className="text-2xl text-center md:text-left font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Blogs {loading && "Loading . . ."} {error && error}
        </h2>
        <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles?.map((blog) => (
            <li
              className="border border-gray-700 rounded-md p-5 grid items-center"
              key={blog._id}
            >
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">{blog.title}</h3>
                {isAdmin && (
                  <div className="flex items-center gap-3">
                    <Trash
                      role="button"
                      className="text-red-600 cursor-pointer hover:text-red-400"
                      onClick={() => handleDelete(blog._id)}
                    />
                    <Link href={`/edit/article/${blog._id}`}>
                      <Edit className="text-green-600 cursor-pointer hover:text-green-400" />
                    </Link>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-400 my-2">{blog.description}</p>

              <p className="text-xs text-left">
                {gmtToLocal(blog.updatedAt)
                  .toString()
                  .slice(4, gmtToLocal(blog.updatedAt).toString().indexOf("G"))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
