import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import React from "react";

import utils from "../../../utils/localstorage";
import styles from "./sidebar.module.scss";
import types from "../../../config/types";
import BrandLogo from "../brand";

import sidebarItems from "../../../data/sidebar.json";

function Sidebar() {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.path === "/notes") {
      let data = utils.getFromLocalStorage(types.NOTES_DATA);
      let updatedData = [
        {
          id: data.length + 1,
          color: "rgba(174, 223, 232, 0.4)",
          text: "",
          createdAt: new Date().toISOString(),
        },
        ...data,
      ];
      utils.addToLocalStorage(types.NOTES_DATA, updatedData);
    }
  };

  const handleLogout = () => {
    utils.removeFromLocalStorage("auth_key");
    navigate("/");
  };

  return (
    <aside className={styles.sidebar}>
      <BrandLogo logoOnly={true} type={"dark"} className={styles.logo} />
      <section>
        {sidebarItems.map((item, index) => {
          return (
            <article key={index} className={styles.item} onClick={() => handleClick(item)}>
              <Icon icon={item.icon} color={index === 1 ? "var(--light-grey)" : "var(--white)"} />
            </article>
          );
        })}
      </section>
      <article className={styles.logout}>
        <Icon icon={"material-symbols:logout"} onClick={handleLogout} />
      </article>
    </aside>
  );
}

export default Sidebar;
