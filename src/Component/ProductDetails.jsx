import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../Store/ProductContext"; // Ensure this context provides product data

const ProductDetails = () => {
  const { id } = useParams();
  const { filtered } = useProducts();
  const product = filtered.find((p) => p.id === parseInt(id));

  if (!product) return <p className="text-center text-red-500 text-lg font-semibold">Product not found!</p>;

  return (
    <section className="container mx-auto px-6 py-10 max-w-4xl bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <figure className="w-full md:w-1/2 flex justify-center items-center">
          <img src={product.image} alt={product.name} className="w-full max-w-sm rounded-md shadow-md" />
        </figure>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-semibold mt-2">₹{product.price}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Add to Cart Button */}
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
