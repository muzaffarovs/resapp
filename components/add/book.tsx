"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";

export default function AddBook() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<false | string>(false);
  const router = useRouter();
  const [prog, setProgress] = useState<number>(0);

  const postUrl = useCallback(async () => {
    if (!title || !url) {
      setErrorMessage("Both fields are required.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url }),
      });
      console.log("Book submitted:");
      setTitle("");
      router.push("/books");
    } catch (error) {
      console.error("Submission failed:", error);
      setErrorMessage("Failed to submit the book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [router, title, url]);

  useEffect(() => {
    postUrl();
  }, [url, postUrl]);

  const handleSubmit = async () => {
    if (file) {
      const res = await edgestore.myPublicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });
      console.log(url);

      setUrl(res.url);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div className="w-full flex flex-col gap-5">
      <input
        className="p-2 text-white rounded-md shadow-md bg-gray-700/60"
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={handleChange}
      />
      <input
        className="p-2 text-white rounded-md shadow-md bg-gray-700/60 w-full mb-3 border"
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <div className="rounded-md border h-9 p-0">
        <div
          className="rounded-md text-center text-pink-600 py-1 bg-white w-full"
          style={{ width: prog }}
        >
          {prog}
        </div>
      </div>
      <button
        className="border w-full py-1 px-3 rounded-md bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        Upload
      </button>
      {errorMessage && `${errorMessage}`}
    </div>
  );
}
