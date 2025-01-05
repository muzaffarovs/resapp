"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface InpType {
  title: string;
  url: string;
}

const AddVideo = () => {
  const router = useRouter();
  const [video, setVideo] = useState<InpType>({
    title: "",
    url: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!video.title || !video.url) {
      setErrorMessage("Both fields are required.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(video),
      });
      console.log("Video submitted:", video);
      setVideo({ title: "", url: "" });
      router.push("/videos");
    } catch (error) {
      console.error("Submission failed:", error);
      setErrorMessage("Failed to submit the video. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange =
    (field: keyof InpType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setVideo((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <input
        className="p-2 text-white rounded-md shadow-md bg-gray-700/60"
        type="text"
        name="title"
        placeholder="Title"
        value={video.title}
        onChange={handleChange("title")}
      />
      <textarea
        className="p-2 text-white rounded-md shadow-md bg-gray-700/60 h-32"
        name="url"
        placeholder="url"
        value={video.url}
        onChange={handleChange("url")}
      />
      {errorMessage && (
        <div className="text-red-500 text-sm">{errorMessage}</div>
      )}
      <div className="flex justify-between gap-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="border w-full py-1 px-3 rounded-md bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="border w-full py-1 px-3 rounded-md bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          back
        </button>
      </div>
    </form>
  );
};

export default AddVideo;
