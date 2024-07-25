import React, { useState } from "react";
import toast from "react-hot-toast";
import AddCss from "../Admin/Add.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/firebase"; 

const EditModal = ({ editProductId, setWantEdit, selectedProduct }) => {
  const [productName, setProductName] = useState(selectedProduct.title);
  const [productPrice, setProductPrice] = useState(selectedProduct.price);
  const [description, setDescription] = useState(selectedProduct.description);
  const [productImg, setProductImg] = useState(null);
  const [count, setCount] = useState(selectedProduct.count);
  const [imageError, setImageError] = useState("");
  const [currentImgUrl, setCurrentImgUrl] = useState(selectedProduct.imageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const types = ["image/png", "image/jpeg"];

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setImageError("");
      setCurrentImgUrl(URL.createObjectURL(selectedFile));
    } else {
      setProductImg(null);
      setImageError("Please select a valid image type (jpg or png)");
    }
  };

  const dontWantEdit = (event) => {
    event.preventDefault();
    setWantEdit(false);
  };

  const wantEdit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      let filePath = currentImgUrl;

      if (productImg) {
       
        const storage = getStorage();
        const storageRef = ref(storage, `products/${productImg.name}`);
        await uploadBytes(storageRef, productImg);

       
        filePath = `${productImg.name}`;
      }

      const docRef = doc(db, "products", editProductId);

      await updateDoc(docRef, {
        title: productName,
        price: productPrice,
        description: description,
        imageUrl: filePath,
        count: count,
      });

      toast.success("Item successfully edited.");

    
      setProductName("");
      setProductPrice("");
      setDescription("");
      setCount("");
      setProductImg(null);
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Failed to edit item.");
    } finally {
      setIsLoading(false);
    }

    setWantEdit(false);
  };

  return (
    <div className="flex justify-center fixed inset-0 backdrop-blur-xl z-10 items-center bg-[#1d1d1d4d] ">
      <div className="mx-0 h-fit w-1/3 bg-white roundedlg p-5 ">
        <div className="flex flex-col gap-5 items-center">
          <div className="flex flex-col gap-1">
            <div>{editProductId}</div>

            <div className={AddCss.inputForProduct}>
              <label htmlFor="product-name">Product Name:</label>
              <input
                type="text"
                className={AddCss.formControl}
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
            </div>

            <div className={AddCss.inputForProduct}>
              <label htmlFor="product-description">Product Description:</label>
              <input
                type="text"
                className={AddCss.formControl}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div className={AddCss.inputForProduct}>
              <label htmlFor="product-price">Product Price</label>
              <input
                type="number"
                className={AddCss.formControl}
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
              />
            </div>

            <div className={AddCss.inputForProduct}>
              <label htmlFor="product-count">Product Count</label>
              <input
                type="number"
                className={AddCss.formControl}
                onChange={(e) => setCount(e.target.value)}
                value={count}
              />
            </div>

            <div className={AddCss.inputForProduct}>
              <label htmlFor="product-img">Product Image</label>
              <input
                type="file"
                className={AddCss.formControl}
                id="file"
                onChange={productImgHandler}
              />
              {currentImgUrl && (
                <img
                  src={currentImgUrl}
                  alt="Current Product"
                  style={{ width: "100px", height: "100px", marginTop: "10px" }}
                />
              )}
            </div>
          </div>
          <div className="w-full justify-center flex gap-2">
            <button
              onClick={dontWantEdit}
              className="w-auto px-4 py-2 font-medium rounded-md duration-200 hover:bg-neutral-200 order-1"
            >
              No, keep it
            </button>
            <button
              onClick={wantEdit}
              disabled={isLoading}
              className={`${
                isLoading
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer opacity-100 hover:bg-transparent hover:bg-[#d54947] hover:text-[#d54947]"
              } w-auto px-4 py-2 font-medium rounded-md duration-200 bg-[#da4848e6] order-1 text-white`}
            >
              {isLoading ? "Editing..." : "Yes, edit it"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
