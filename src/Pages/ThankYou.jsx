import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Thank you for your order!</h1>
        <p className="mb-6 text-gray-700">We appreciate your purchase and hope you enjoy your product.</p>
        <Link
          to="/product"
          className="inline-block  text-white px-6 py-2 rounded pro transition"
        >
          Purchase More
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
