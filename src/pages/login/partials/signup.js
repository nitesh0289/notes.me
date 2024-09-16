import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";

import Button from "../../../components/atoms/button";
import Input from "../../../components/atoms/input";
import styles from "./partials.module.scss";

function Signup(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSignup = () => {
    //Logic for signup!
  };

  return (
    <div className={styles.form}>
      <Button text="Join with Google" icon="bi:google" className={styles.google} />
      <div className={styles.option}>
        <span>or join with email address</span>
      </div>
      <article className={styles.details}>
        <Input
          type="name"
          value={name}
          placeholder={"Full Name"}
          onChange={(e) => setName(e.target.value)}
        />
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
          handleClick={handleSignup}
        />
      </article>
    </div>
  );
}

export default Signup;
