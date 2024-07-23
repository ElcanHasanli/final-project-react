//!REVAN
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "../Login/Login.module.css"
import mediaCss from "../Login/media.css"
import svg from "../../Images/Login/login.jpg"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.js'
import { useTranslation } from "react-i18next";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [inputErrors, setInputErrors] = useState({
    email: false,
    password: false,
  });



  const handleSubmit = async (e) => {
    e.preventDefault();


    if (validateInputs()) {
      try {

        const response = await signInWithEmailAndPassword(auth, email, password);
        //Fatime codes start
        sessionStorage.setItem("token", response?.user?.accessToken);
        sessionStorage.setItem("email", response?.user?.email);

        setIsLoggedIn(true);
        navigate('/');
        // console.log('Qeydiyyat olundu hersey okeydurr');
        // console.log(response.user);
        console.log(response);
        //Fatime codes end

      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Password yanlış');
    }
  };


  const validateInputs = () => {
    const errors = {
      email: !email || email.trim() === '' || !/\S+@\S+\.\S+/.test(email),
      password: password.trim() === '' || password.length < 6,
    };

    setInputErrors(errors);

    return !errors.email && !errors.password;
  };

  const { t } = useTranslation();
  return (
    <div>
      <div className={styles.login}>
        <div className={styles.log}>
          <img src={svg} alt='Login' id='image' className={styles.logImg} />
        </div>

        <div className={styles.text} id='login-text-items'>
          <h1 id='login-items-text' className={styles.textH1}>{t("Log in to")} Exclusive</h1>
          <p id='login-p' className={styles.textP}>{t("Enter your details below")}</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} id='login-input' placeholder={t("Email or Phone Number")} className={`${styles.textInput} ${inputErrors.email ? styles.error : ''}`}></input>
          <input value={password} onChange={(e) => setPassword(e.target.value)} id='login-input' placeholder={t("Password")} type='password' className={`${styles.textInput} ${inputErrors.password ? styles.error : ''}`}></input>
          <div className={styles.forget}>
            <button onClick={handleSubmit} id='login-btn' className={styles.forgetButton}>{t("Log in")}</button>
            <p className={styles.forgetP} id='forget-pass'>{t("Forget Password?")}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login;

