"use client";
import { Article } from "@/components/blog/list";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

export default function Edit() {
  const param = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchArticle = useCallback(async () => {
    if (!param?.id) return;
    try {
      const res = await fetch(`/api/blogs/${param.id}`, { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch article");
      const data = await res.json();
      setArticle(data.blog);
    } catch {
      setErrorMessage("Failed to fetch article. Please try again later.");
    }
  }, [param?.id]);

  useEffect(() => {
    fetchArticle();
  }, [param, fetchArticle]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!article?.title || !article?.description) {
      setErrorMessage("Title and description are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/blogs/${param.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });
      if (!res.ok) throw new Error("Failed to update");
      router.push("/blog");
    } catch {
      setErrorMessage("Failed to update the blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange =
    (field: keyof Article) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setArticle((prev) => prev && { ...prev, [field]: e.target.value });
    };

  return (
    <div className="h-screen md:pt-24 bg-gradient-to-r from-gray-800 via-gray-900 to-black py-10 grid gap-10">
      <section className="h-fit w-full md:w-[calc(100%-4rem)] max-w-7xl md:border border-gray-700 md:rounded-xl z-20 mx-auto bg-transparent md:bg-gradient-to-r from-gray-800 via-gray-900 to-black">
        <div className="bg-transparent text-white py-16 rounded-xl">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-base md:text-2xl my-5 text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Edit blog {param?.id}
            </h2>
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                className="p-2 text-white rounded-md shadow-md bg-gray-700/60"
                type="text"
                name="title"
                placeholder="title"
                value={article?.title || ""}
                onChange={handleChange("title")}
              />
              <textarea
                className="p-2 text-white rounded-md shadow-md bg-gray-700/60 h-32"
                name="description"
                placeholder="description"
                value={article?.description || ""}
                onChange={handleChange("description")}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="border w-fit py-1 px-3 rounded-md bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
