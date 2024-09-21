import { Outlet, useNavigate } from "react-router-dom";
import React, { Suspense, useEffect } from "react";

import Loader from "../components/shared/loader";

import Sidebar from "../components/shared/sidebar";
import Navbar from "../components/shared/navbar";
import styles from "./layout.module.scss";
import utils from "../utils/localstorage";

function Main() {
  const navigate = useNavigate();

  //Restricting routing
  useEffect(() => {
    if (!Boolean(utils.getFromLocalStorage("login_cred"))) {
      navigate("/");
    }
  }, []);

  return (
    <main className={styles.container}>
      <Suspense fallback={<Loader />}>
        {/* SideBar */}
        <Sidebar />
        <div className={styles.main}>
          {/* Navbar */}
          <Navbar />
          <Outlet />
        </div>
      </Suspense>
    </main>
  );
}

export default Main;
