import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../SignUp/SignUp.module.css";
import svg from "../../Images/Login/login.jpg";
import { FcGoogle } from "react-icons/fc";
import SignUpMediacss from "../SignUp/SignUp.media.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebase } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { use } from "i18next";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const afterSubmit = () => {
    setSuccessMsg("Signup successfull");
    setFullName("");
    setEmail("");
    setPassword("");
    setErrorMsg("");
  };
  const handleSignUp = (e) => {
    e.preventDefault();
   

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       
        const user = userCredential.user;
        console.log("User signed up:", user);
      })
      .catch((error) => {
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error details:", error);
      })
      .finally(() => {
        navigate("/");
        onAuthStateChanged(auth, (user) => {
          if (user) {
          
            const uid = user.uid;
            console.log(uid);
            console.log(user);
            
          } else {
           
          }
        });
      });
  };
  const { t } = useTranslation();
  return (
    <div>
      <div id="account" className={styles.Account}>
        <div className={styles.Account}>
          <div className={styles.acc}>
            <img src={svg} alt="Login" id="image" className={styles.accImg} />
          </div>
          <div className={styles.text} id="account-text-items">
            <h1 id="account-items-text" className={styles.textH1}>
              {t("Create an account")}
            </h1>
            <p id="account-p" className={styles.textP}>
              {t("Enter your details below")}
            </p>
            {successMsg && (
              <>
                <div className="success-msg">{successMsg}</div>
                <br />
              </>
            )}
            <form action="" onSubmit={handleSignUp}>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                id="account-input"
                placeholder={t("Name")}
                className={styles.textInput} 
              ></input>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="account-input"
              placeholder={t("Email or Phone Number")}
              className={styles.textInput} 
              ></input>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="account-input"
            placeholder={t("Password")}
            type="password"
            className={styles.textInput} 
              />
        </form>
        {errorMsg && (
          <>
            <div className="error-msg">{errorMsg}</div>
            <br />
          </>
        )}
        <div className={styles.forget}>
          <button
            onClick={handleSignUp}
            id="account-btn"
            className={styles.AccountButton}
          >
            {t("Create Account")}
          </button>
          <button id="Google-btn" className={styles.GoogleButton}>
            {" "}
            <FcGoogle className={styles.icon} />
            {t("Sign up with Google")}
          </button>
          <div id="p" className={styles.P}>
            <p className={styles.forgetP} id="forget-pass">
              {t("Already have account?")}
            </p>
            <Link to="/Login" className={styles.AccountP}>
              {t("Log in")}
            </Link>
          </div>
        </div>
      </div>
    </div>
      </div >
    </div >
  );
};

export default SignUp;