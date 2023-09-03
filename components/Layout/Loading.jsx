import React from "react";

const Loading = () => {
  return (
    <div className="fixed z-[999] top-0 left-0 w-full h-screen bg-mainBlack flex items-center justify-center">
      <div className="loader-screen-loader">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 66 66"
          height="100px"
          width="100px"
          className="loader-screen-spinner"
        >
          <circle
            stroke="url(#gradient)"
            r="20"
            cy="33"
            cx="33"
            strokeWidth="1"
            fill="transparent"
            className="loader-screen-path"
          ></circle>
          <linearGradient id="gradient">
            <stop stopOpacity="1" stopColor="#fe0000" offset="0%"></stop>
            <stop stopOpacity="0" stopColor="#af3dff" offset="100%"></stop>
          </linearGradient>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
