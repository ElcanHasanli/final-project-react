//!ELCAN
import React from "react";
import { useTranslation } from "react-i18next";
import SingleProduct from "../OurProducts/SingleProduct";

function MainSlider({ products, loading, error }) {
  const { t } = useTranslation();

  const hasDiscount = products.filter((p) => p.discount > 0);

  return (
    <div className="container">
      <div className=" grid grid-cols-4 gap-5 ">
        {loading | error
          ? Array.from({ length: 4 }).map((_, index) => (
              <div className=" mb-4 border border-neutral-200 h-full animate-pulse bg-[#FAFAFA] overflow-hidden rounded-lg ">
                <div className=" w-full h-full object-contain aspect-[3/2] p-4 mix-blend-darken  "></div>
              </div>
            ))
          : hasDiscount.map((p) => (
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
}

export default MainSlider;
