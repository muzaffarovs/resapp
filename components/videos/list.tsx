"use client";
import { useStore } from "@/app/store/store";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export type Video = {
  updatedAt: number;
  title: string;
  url: string;
  _id: number;
};

const List = () => {
  const { isAdmin } = useStore();
  const [videos, setVideos] = useState<Video[]>();
  const [loading, setLoading] = useState<false | string>(false);
  const [error, setError] = useState<boolean | string>(false);

  const gmtToLocal = (gmt: number) => {
    return new Date(gmt.toLocaleString());
  };

  const getYouTubeVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchArticles = async () => {
    setLoading("Loading...");
    try {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data.videos);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setError("Error occured while loading the videos");
      setLoading(false);
    }
  };

  const handleDelete = useCallback(async (id: number) => {
    setLoading("Deleting...");
    try {
      await fetch(`/api/videos?id=${id}`, {
        method: "DELETE",
      });
      setLoading(false);
      fetchArticles();
    } catch (error) {
      console.error("Failed to delete video:", error);
      setError("Error occured while deleting the videos");
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
          Videos {loading && "Loading . . ."} {error && error}
        </h2>
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {videos?.map((video) => (
            <li
              className="border w-72 border-gray-700 rounded-md p-5 items-center mx-auto"
              key={video._id}
            >
              <h3 className="font-bold text-lg text-wrap p-0">{video.title}</h3>

              <iframe
                className="my-3 w-full"
                width="full"
                height="full"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  video.url
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>

              <p className="text-xs text-left">
                {gmtToLocal(video.updatedAt)
                  .toString()
                  .slice(
                    4,
                    gmtToLocal(video.updatedAt).toString().indexOf("G")
                  )}
              </p>
              {isAdmin && (
                <div className="flex items-center gap-3 mt-2">
                  <Trash
                    role="button"
                    className="text-red-600 cursor-pointer hover:text-red-400"
                    onClick={() => handleDelete(video._id)}
                  />
                  <Link href={`/edit/video/${video._id}`}>
                    <Edit className="text-green-600 cursor-pointer hover:text-green-400" />
                  </Link>
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
