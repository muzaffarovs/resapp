"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useStore } from "../store/store";

const AdminAuth = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | false>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setAdmin } = useStore();

  const router = useRouter();

  const checkPass = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!data.success) {
        setError("Invalid password. Please try again.");
        return;
      }

      localStorage.setItem("user", "admin");
      setAdmin(true);
      router.back();
    } catch (err) {
      console.error("Error during authentication:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateMemory = async () => {
    localStorage.setItem("user", "user");
    setAdmin(false);
    router.back();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkPass();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="h-screen pt-24 bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-opacity-80 py-10 grid place-items-center">
      <div className="bg-transparent w-full max-w-lg p-6 rounded-lg shadow-lg text-white z-20">
        <h3 className="mb-4 text-center">
          Enter admin password to add or edit data
        </h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="password"
            className="w-full p-3 border rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter admin password"
            value={password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full p-3 bg-purple-500 text-white font-bold rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
        <button
          onClick={updateMemory}
          className="w-full mt-4 p-3 bg-gray-500 text-white font-bold rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Continue as Guest
        </button>
        <p className="mt-4 text-center text-red-500">{error && error}</p>
      </div>
    </div>
  );
};

export default AdminAuth;
