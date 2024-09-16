import React from "react";

import ProgressBar from "../../atoms/progress-bar";
import BrandLogo from "../brand";

import styles from "./loader.module.scss";

function Loader() {
  return (
    <article className={styles.container}>
      <BrandLogo />
      <ProgressBar />
    </article>
  );
}

export default Loader;
