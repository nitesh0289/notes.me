import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";

import Button from "../../../components/atoms/button";
import Input from "../../../components/atoms/input";
import utils from "../../../utils/localstorage";

import styles from "./partials.module.scss";

function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    //Logic for Login!
  };

  return (
    <div className={styles.form}>
      <Button text="Join with Google" icon="bi:google" className={styles.google} />
      <div className={styles.option}>
        <span>or join with email address</span>
      </div>
      <article className={styles.details}>
        <Input
          type="email"
          value={email}
          placeholder={"Type your Email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder={"Type your Password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="Join with Email"
          icon="material-symbols:login"
          className={styles.emailBtn}
          handleClick={handleLogin}
        />
      </article>
    </div>
  );
}

export default Signin;
