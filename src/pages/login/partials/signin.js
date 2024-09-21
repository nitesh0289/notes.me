import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";

import Button from "../../../components/atoms/button";
import Input from "../../../components/atoms/input";
import utils from "../../../utils/localstorage";
import apis from "../../../apis";

import styles from "./partials.module.scss";

function Signin() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warning("Please fill all details!");
      return;
    }
    setLoading(true);
    const res = await apis.login({ email, password });
    setLoading(false);
    if (res.status === 200) {
      toast.success("Signin successfull!");
      utils.addToLocalStorage("login_cred", res.data.token);
      navigate("/notes");
    } else toast.error(res.data.message || "Something went wrong!");
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
          isDisabled={loading}
          handleClick={handleLogin}
          className={styles.emailBtn}
          icon={loading ? null : "material-symbols:login"}
          text={loading ? <Icon icon={"svg-spinners:180-ring"} /> : "Join with Email"}
        />
      </article>
    </div>
  );
}

export default Signin;
