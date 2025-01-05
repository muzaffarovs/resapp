import React from "react";

const BgPattern = () => {
  return (
    <div
      className="absolute inset-x-0 top-0 h-full opacity-20 md:opacity-100 z-10 animate-grid"
      style={{
        backgroundImage: `
      repeating-linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 50px),
      repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 50px)
    `,
      }}
    ></div>
  );
};

export default BgPattern;
