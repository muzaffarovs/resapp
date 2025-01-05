"use client";
import { useStore } from "@/app/store/store";
import { useEdgeStore } from "@/lib/edgestore";
import { Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export type Book = {
  updatedAt: number;
  title: string;
  url: string;
  _id: number;
};

export const List = () => {
  const { isAdmin } = useStore();
  const [book, setBooks] = useState<Book[]>();
  const [loading, setLoading] = useState<false | string>(false);
  const [error, setError] = useState<boolean | string>(false);

  const gmtToLocal = (gmt: number) => {
    return new Date(gmt.toLocaleString());
  };

  const { edgestore } = useEdgeStore();

  const fetchArticles = async () => {
    setLoading("Loading...");
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data.books);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setError("Error occured while loading the books");
      setLoading(false);
    }
  };

  const handleDelete = useCallback(
    async (id: number, url: string) => {
      setLoading("Deleting...");
      try {
        await fetch(`/api/books?id=${id}`, {
          method: "DELETE",
        });

        await edgestore.myPublicFiles.delete({ url: url });

        setLoading(false);
        fetchArticles();
      } catch (error) {
        console.error("Failed to delete book:", error);
        setError("Error occured while deleting the books");
        setLoading(false);
      }
    },
    [edgestore.myPublicFiles]
  );

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="h-fit w-full md:w-[calc(100%-4rem)] max-w-7xl md:border border-gray-700 md:rounded-xl z-20 mx-auto">
      <div className="bg-transparent md:bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white rounded-xl px-6 py-10">
        <h2 className="text-2xl text-center md:text-left font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Books {loading && "Loading . . ."} {error && error}
        </h2>
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {book?.map((book) => (
            <li
              className="border w-72 border-gray-700 rounded-md p-5 items-center mx-auto"
              key={book._id}
            >
              <p>{book.title}</p>

              <Link
                className="block my-2 text-red-400"
                href={book.url}
                target="_blank"
              >
                URL
              </Link>

              <p className="text-xs text-left">
                {gmtToLocal(book.updatedAt)
                  .toString()
                  .slice(4, gmtToLocal(book.updatedAt).toString().indexOf("G"))}
              </p>
              {isAdmin && (
                <div className="flex items-center gap-3 mt-2">
                  <Trash
                    role="button"
                    className="text-red-600 cursor-pointer hover:text-red-400"
                    onClick={() => handleDelete(book._id, book.url)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
