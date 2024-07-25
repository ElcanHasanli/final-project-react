import React, { useState } from "react";
import AddCss from "../Admin/Add.module.css";
import DeleteModal from "./DeleteModal";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import EditModal from "./EditModal";

const AddProducts = ({ products, loading, error }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [imageError, setImageError] = useState("");
  const [wantDelete, setWantDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState("");
  const [wantEdit, setWantEdit] = useState(false);
  const [editProductId, setEditProductId] = useState(0);

  const types = ["image/png"];

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setImageError("");
    } else {
      setProductImg(null);
      setImageError("Please select a valid image type (jpg or png)");
    }
  };

  const deleteProduct = async (id) => {
    setDeleteProductId(id);
    setWantDelete(true);
  };

  const editProduct = (id) => {
    setEditProductId(id);
    setWantEdit(true);
  };

  const addProductData = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
     
      const storage = getStorage();
      const storageRef = ref(storage, `products/${productImg.name}`);
      await uploadBytes(storageRef, productImg);

     
      const filePath = `${productImg.name}`;

    
      const docRef = await addDoc(collection(db, "products"), {
        title: productName,
        price: productPrice,
        description: description,
        imageUrl: filePath,
        count: count,
        discount: 0,
        isFavourite: false,
        isInCart: false,
      });

      console.log("Document written with ID: ", docRef.id);
      toast.success("Item successfully added.");

    
      setProductName("");
      setProductPrice("");
      setDescription("");
      setCount("");
      setProductImg(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to add item.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container flex flex-col gap-5"
      style={{ display: "flex", marginTop: "30px" }}
    >
      <br />
      <div style={{ width: "100%" }}>
        <h2>ADD PRODUCTS</h2>
        <hr />
        <form autoComplete="off" className={AddCss.formGroup}>
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
            <label htmlFor="product-desciption">Product Description:</label>
            <input
              type="text"
              className={AddCss.formControl}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <br />

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

          <br />

          <div className={AddCss.inputForProduct}>
            <label htmlFor="product-img">Product Image</label>
            <input
              type="file"
              className={AddCss.formControl}
              id="file"
              onChange={productImgHandler}
            />
          </div>

          <br />
          <button
            onClick={addProductData}
            type="submit"
            disabled={isLoading}
            className={` ${
              isLoading
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer opacity-100 hover:bg-transparent hover:text-red-500"
            } bg-red-500 text-white duration-150 px-10 py-1.5 rounded-lg border border-red-500  `}
          >
            {isLoading ? "Adding" : "Add"}
          </button>
        </form>
        {imageError && <span className="error-msg">{imageError}</span>}
      </div>
      <br />

      <table className="border border-black">
        <thead>
          <tr>
            <th className="border-r border-r-black">Id</th>
            <th className="border-r border-r-black">Image</th>
            <th className="border-r border-r-black">Title</th>
            <th className="border-r border-r-black">Price</th>
            <th className="border-r border-r-black">Description</th>
            <th className="border-r border-r-black">Count</th>
            <th className="border-r border-r-black">Edit</th>
            <th className="border-r border-r-black">Delete</th>
          </tr>
        </thead>
        {products.map((p) => (
          <tr key={p.id} className="border-t border-t-black">
            <td className="border-r border-r-black">
              <img className="w-20 h-20" src={p.imageUrl} alt={p.title} />
            </td>
            <td className="border-r border-r-black">{p.id}</td>
            <td className="border-r border-r-black">{p.title}</td>
            <td className="border-r border-r-black">{p.price}</td>
            <td className="border-r border-r-black  ">{p.description}</td>
            <td className="border-r border-r-black  ">{p.count}</td>
            <td className="border-r border-r-black px-2">
              <button
                onClick={editProduct.bind(this, p.id)}
                className="bg-red-500 text-white rounded-lg w-full py-2"
              >
                Edit
              </button>
            </td>
            <td className="border-r border-r-black px-2">
              <button
                onClick={() => deleteProduct(p.id)}
                className="bg-black text-white rounded-lg w-full py-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>

      {wantDelete && (
        <DeleteModal
          setWantDelete={setWantDelete}
          deleteProductId={deleteProductId}
        />
      )}

      {wantEdit && (
        <EditModal
          editProductId={editProductId}
          setWantEdit={setWantEdit}
          selectedProduct={products.find((p) => p.id === editProductId)}
        />
      )}
    </div>
  );
};

export default AddProducts;
