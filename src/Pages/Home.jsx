import React from "react";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate("/product");
  };
  return (
    <section className="hm-con align-element py-20">
      <div className=" grid lg:grid-cols-2 gap-24 items-center">
        <div className="hm-content">
          <h1 class="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            We are changing the way people shop
          </h1>
          <p class="mt-8 max-w-xl text-lg leading-8">
           Nature products are made from pure, plant-based ingredients that nourish your skin gently.
Free from harmful chemicals, they promote natural beauty and long-term skin health.
Feel the difference with turmeric, oils, and herbs that soothe and protect every day
          </p>
         <button className=" mt-5 btn pro" onClick={goToProduct}>
              Our Products
            </button>
        </div>
        <div className=" p-4 space-x-4 bg-neutral rounded-box ">
       
            <img src="/product/neam.webp" class="rounded-box h-full w-80 object-cover">
            </img>
            
        </div>
      </div>
    </section>
  );
};

export default Home;
