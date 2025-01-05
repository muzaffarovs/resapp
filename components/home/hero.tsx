import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="h-full w-full md:w-[calc(100%-4rem)] max-w-7xl md:border border-gray-700 md:rounded-xl z-20 mx-auto">
      <div className="bg-transparent md:bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-16 rounded-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Welcome to ResApp
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Empower your learning journey with videos, books, and blogs
              tailored to your needs.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start space-x-4">
              <Link
                href="#categories"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-all"
              >
                Get Started
              </Link>
              <Link
                href="#categories"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            <Image
              src="/Learning-amico.png"
              alt="Hero Illustration"
              className="w-full max-w-md rounded-lg"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
