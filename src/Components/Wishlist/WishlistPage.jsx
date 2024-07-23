//!FATIME
import React, { useEffect, useState } from "react";
import wishlistStyle from "../Wishlist/Wishlist.module.css";
import SingleProduct from "../OurProducts/SingleProduct";

const Wishlist = ({ products, loading, error }) => {
  const wishlist = products.filter((p) => p.isFavourite === true);

  return (
    <div className={wishlistStyle.wishlist}>
      <h2>Wishlist</h2>

      <div className=" grid grid-cols-3 gap-5 mt-6 ">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div className=" mb-4 border border-neutral-200 h-full animate-pulse bg-[#FAFAFA] overflow-hidden rounded-lg ">
                <div className=" w-full h-full object-contain aspect-[3/2] p-4 mix-blend-darken  ">
                  loading
                </div>
              </div>
            ))
          : error
          ? Array.from({ length: 6 }).map((_, index) => (
              <div className=" mb-4 border border-neutral-200 h-full animate-pulse bg-[#FAFAFA] overflow-hidden rounded-lg ">
                <div className=" w-full h-full object-contain aspect-[3/2] p-4 mix-blend-darken  ">
                  error
                </div>
              </div>
            ))
          : wishlist.map((p) => (
              <SingleProduct
                product={p}
                id={p.id}
                title={p.title}
                imageUrl={p.imageUrl}
                rating={p.rating}
                price={p.price}
              />
            ))}
      </div>
    </div>
  );
};

export default Wishlist;
