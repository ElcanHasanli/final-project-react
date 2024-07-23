//!ELCAN
import React from "react";
import styles from "./Selling.module.css";
import { useTranslation } from "react-i18next";

import SingleProduct from "../OurProducts/SingleProduct";
function Selling({ products, loading, error }) {
  const bestSelling = products.filter((p) => p.bestSelling === true);

  const { t } = useTranslation();
  return (
    <div className="container">
      <div className={styles.firstSelling}>
        <div className={styles.selling}>
          <div className={styles.rectangle}>
            <div className={styles.red}></div>
            <h1>{t("This Month")}</h1>
          </div>
          <h1 className={styles.browsing}>{t("Best Selling Products")}</h1>
        </div>
        <div className={styles.view}>
          <button>{t("View All")}</button>
        </div>
      </div>
      <div className=" grid grid-cols-4 gap-5 mt-6 ">
        {loading | error
          ? Array.from({ length: 4 }).map((_, index) => (
              <div className=" mb-4 border border-neutral-200 h-full animate-pulse bg-[#FAFAFA] overflow-hidden rounded-lg ">
                <div className=" w-full h-full object-contain aspect-[3/2] p-4 mix-blend-darken  "></div>
              </div>
            ))
          : bestSelling.map((p) => (
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

export default Selling;
