import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="h-full w-full md:w-[calc(100%-4rem)] brightness-90 max-w-7xl bg-[url('/hero1.jpg')] bg-cover bg-center md:border border-gray-700 md:rounded-xl z-20 mx-auto relative">
      <div className="absolute inset-0 bg-black bg-opacity-40 md:rounded-xl"></div>

      <div className="relative py-28 rounded-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in">
              Welcome to School 230
            </h1>
            <p className="mt-4 text-lg text-gray-100 drop-shadow-md">
              Empower your learning journey with videos, books, and blogs
              tailored to your needs.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start space-x-4 animate-slide-up">
              <Link
                href="#categories"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Get Started
              </Link>
              <Link
                href="#categories"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center animate-fade-in">
            <div className="hidden md:block w-full max-w-md lg:max-w-lg">
              <img
                src="/hero1.jpg"
                alt="Hero Illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
