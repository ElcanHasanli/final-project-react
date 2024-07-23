import Header from "./Components/Header/Header";
import SignUp from "../src/Components/SignUp/SignUp";
import Footer from "../src/Components/Footer/Footer";
import WishlistPage from "./Components/Wishlist/WishlistPage";
import Login from "../src/Components/Login/Login";
import About from "../src/Components/About/About";
import Home from "./Components/Home";
import Contact from "./Components/Contact/Contact";
import Cart2 from "./Components/Cart/Cart2";
import ProductView from "./Components/ProductView/ProductView";
import Cart from "./Components/Cart/Cart";
import Addproducts from "./Admin/Addproducts";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LoginForm from "./Admin/LoginAdmin/LoginPage";
import "./index.css";
import { Toaster } from "react-hot-toast";

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "./firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";

function AppContent() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getAllData = async () => {
    try {
      setError(false);
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = [];

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const imageRef = ref(storage, `products/${data.imageUrl}`);
        const imageUrl = await getDownloadURL(imageRef);
        productsData.push({ id: doc.id, ...data, imageUrl });
      }

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <Toaster position="top-right" />
      {location.pathname !== "/adminpanel" &&
        location.pathname !== "/admin" && (
          <>
            <Header />
          </>
        )}

      <Routes>
        <Route
          path="/"
          element={<Home products={products} loading={loading} error={error} />}
        />
        <Route path="/admin" element={<LoginForm />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Wishlist"
          element={
            <WishlistPage products={products} loading={loading} error={error} />
          }
        />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Contact" element={<Contact />} />
        <Route
          path="/product/:id"
          element={
            <ProductView products={products} loading={loading} error={error} />
          }
        />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route
          path="/adminpanel"
          element={
            <Addproducts products={products} loading={loading} error={error} />
          }
        />
      </Routes>

      {location.pathname !== "/adminpanel" &&
        location.pathname !== "/admin" && (
          <>
            <Footer />
          </>
        )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
