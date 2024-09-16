import React from "react";

import LoginImg from "../../../../assets/login.png";
import styles from "./left.module.scss";

function Left() {
  return (
    <section className={styles.left}>
      <img src={LoginImg} alt="login-img" />
      <div>
        <h1> Keep life simple</h1>
        <p>
          Store all your notes in a simple and intuitive app that helps you enjoy what is most
          important in life.
        </p>
      </div>
    </section>
  );
}

export default Left;
