import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { toast } from "react-toastify";

import Button from "../../../components/atoms/button";
import Input from "../../../components/atoms/input";
import utils from "../../../utils/localstorage";
import styles from "./partials.module.scss";
import apis from "../../../apis";

function Signup(props) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !name) {
      toast.warning("Please fill all details!");
      return;
    }
    setLoading(true);
    const res = await apis.register({ email, password, name });
    setLoading(false);
    if (res.status === 201) {
      toast.success("Signup successfull!");
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
          isDisabled={loading}
          handleClick={handleSignup}
          className={styles.emailBtn}
          icon={loading ? null : "material-symbols:login"}
          text={loading ? <Icon icon={"svg-spinners:180-ring"} /> : "Join with Email"}
        />
      </article>
    </div>
  );
}

export default Signup;
