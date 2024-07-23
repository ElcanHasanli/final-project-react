//!FATIME
import React from "react";
import OurProductsStyle from "../OurProducts/OurProducts.module.css";
import GlobalModuleCss from "../GlobalCss/global.module.css";
import MediaStyle from "../GlobalCss/Media/media.css";
import { LuEye } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import firebase from "firebase/app";
import { useState, useEffect } from "react";
import Raiting from "./Raiting";
import WishProduct from "./WishProducts";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cart from "../Cart/Cart";
import SingleProduct from "./SingleProduct";

const ProductList = ({ products, loading, error }) => {
  const { t } = useTranslation();

  return (
    <div className="container ">
      <div className={OurProductsStyle.rectangle}>
        <div className={OurProductsStyle.red}></div>
        <h1
          className={`${GlobalModuleCss.fontPoppins} ${OurProductsStyle.rectangleText}`}
        >
          {t("Our Products")}
        </h1>
      </div>

      <div className="section-our-products mt-6 ">
        <div className="section-ourProducts">
          <h1
            className={OurProductsStyle.sectionProductsText}
            id="section-products-text"
          >
            {t("Explore Our Products")}
          </h1>
        </div>
      </div>

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
          : products.map((p) => (
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

export default ProductList;
