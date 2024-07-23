//!ELCAN
import React from "react";
import ProductViewCss from "../ProductView/ProductView.module.css";
import { Link, useParams } from "react-router-dom";
import img1 from "../../Images/ProductView/de638588f27b571d7565fbaacfe57243.png";
import img2 from "../../Images/ProductView/4d31381f7fe4841786f4511bd4849d87.png";
import img3 from "../../Images/ProductView/9b23a76cbe02748d2090a0b9a11cf0a5.png";
import img4 from "../../Images/ProductView/a445f7c73ec2a2153e0e149e85ee9d28.png";
import img5 from "../../Images/ProductView/9e3950aed9181acb44510f859f50d850.png";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import Coat from "../../Images/Selling/1e9f94261b28e16ea21bacb4144473e8.png";
import Bag from "../../Images/Selling/2722dbdf98f25179d3c0b785988c513d.png";
import Cooler from "../../Images/Selling/c218c97b645d616c8188a4f2e6aaf84b.png";
import BookShelf from "../../Images/Selling/2757d20a14861e2e0ebd4e9889693f59.png";
import styles from "../Selling/Selling.module.css";
import { useTranslation } from "react-i18next";
import GlobalModuleCss from "../GlobalCss/global.module.css";
import { CiHeart } from "react-icons/ci";
import toast from "react-hot-toast";
import Size from "./Size";
import SingleProduct from "../OurProducts/SingleProduct";

function ProductView({ products, error, loading }) {
  const [counter, setCounter] = useState(0);
  const { t } = useTranslation();

  const { id } = useParams();

  const data = products.find((p) => p.id === id);

  console.log(data);

  const { title, price, description, rating, sizes, imageUrl } = products.find(
    (p) => p.id === id
  );

  const bestSelling = products.filter((p) => p.bestSelling === true);

  //increase counter
  const increase = () => {
    setCounter((count) => count + 1);
  };

  //decrease counter
  const decrease = () => {
    setCounter((count) => count - 1);
  };

  //reset counter
  const reset = () => {
    setCounter(0);
  };

  const addToCart = () => {
    toast.success("123");
  };
  return (
    <div className="container">
      <div>
        <div className={ProductViewCss.pageLink} id="page-link">
          <Link to="/Home" className={ProductViewCss.homePage} id="homePage">
            Account /
          </Link>
          <Link to="/Home" className={ProductViewCss.homePage} id="homePage">
            Gaming /
          </Link>
          <p className={ProductViewCss.aboutPage} id="aboutPage">
            {title}
          </p>
        </div>
      </div>
      <div className={ProductViewCss.info}>
        <div className={ProductViewCss.leftSide}>
          <div className={ProductViewCss.secondSide}>
            <div className={ProductViewCss.bigFrame}>
              <img src={imageUrl} className={ProductViewCss.bigImg} alt="" />
            </div>
          </div>
        </div>
        <div className={ProductViewCss.rightSide}>
          <h1 className={ProductViewCss.textH1}>{title}</h1>
          <div>
            <h2 id="price" className={ProductViewCss.textH2}>
              ${price}
            </h2>
            <p className={ProductViewCss.ps}>{description}</p>

            <div className={ProductViewCss.sizeInfo}>
              <h1 className={ProductViewCss.colourH1}>Size:</h1>
              {sizes.map((s) => (
                <Size
                  size={s.name}
                  key={s.name}
                  disabled={!s.available}
                  // click={() => {
                  //   selectSize(s.name);
                  // }}
                />
              ))}
            </div>
            <div className={ProductViewCss.counter}>
              <div>
                <div className={ProductViewCss.btnContainer}>
                  <button
                    className={ProductViewCss.control_btn}
                    onClick={decrease}
                  >
                    -
                  </button>
                  <span className={ProductViewCss.counter_output}>
                    {counter}
                  </span>
                  <button
                    className={ProductViewCss.control_btnn}
                    onClick={increase}
                  >
                    +
                  </button>
                </div>
              </div>
              <button className={ProductViewCss.buy}>Buy now</button>
              {/* <div className={ProductViewCss.wish}>
                                <Link to="/ProductView"><WishProduct /></Link>

                            </div> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.rectangle} id="timer-mobile-rectangle">
          <div className={styles.red}></div>
          <h1
            className={`${GlobalModuleCss.fontPoppins} ${styles.rectangleText}`}
          >
            {t("Today's")}
          </h1>
        </div>
        <div className=" grid grid-cols-4 gap-5 mt-6 ">
          {loading | error
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className=" mb-4 border border-neutral-200 h-full animate-pulse bg-[#FAFAFA] overflow-hidden rounded-lg "
                >
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
    </div>
  );
}

export default ProductView;
