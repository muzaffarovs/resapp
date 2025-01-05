"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface InpType {
  title: string;
  description: string;
}

const AddBlog = () => {
  const router = useRouter();
  const [article, setArticle] = useState<InpType>({
    title: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!article.title || !article.description) {
      setErrorMessage("Both fields are required.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      console.log("Article submitted:", article);
      setArticle({ title: "", description: "" });
      router.push("/blog");
    } catch (error) {
      console.error("Submission failed:", error);
      setErrorMessage("Failed to submit the article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange =
    (field: keyof InpType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setArticle((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <input
        className="p-2 text-white rounded-md shadow-md bg-gray-700/60"
        type="text"
        name="title"
        placeholder="Title"
        value={article.title}
        onChange={handleChange("title")}
      />
      <textarea
        className="p-2 text-white rounded-md shadow-md bg-gray-700/60 h-32"
        name="description"
        placeholder="Description"
        value={article.description}
        onChange={handleChange("description")}
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

export default AddBlog;
