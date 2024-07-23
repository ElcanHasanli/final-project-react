import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const SingleProduct = ({ title, imageUrl, id }) => {
  const addToFavorite = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(`it clicked`);
    try {
      const docRef = doc(db, "products", id);

      await updateDoc(docRef, {
        isFavourite: true,
      });

      toast.success("Item successfully added to wishlist.");
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Failed to favor item.");
    }
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="relative h-fit bg-[#FAFAFA] overflow-hidden rounded-lg mb-4 border border-neutral-200">
        <button
          onClick={addToFavorite}
          className="absolute top-4 right-4 bg-black z-10 w-8 h-8 grid place-items-center rounded-full font-black text-white cursor-pointer"
        >
          ♡
        </button>
        <img
          className="w-full h-full object-contain aspect-[3/2] p-4 mix-blend-darken"
          src={imageUrl}
          alt={title}
        />
      </div>
    </Link>
  );
};

export default SingleProduct;
