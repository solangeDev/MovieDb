import React from "react";
import styles from "./index.module.scss";
import AccountCircle from "mdi-react/AccountCircleIcon";
import AccountMultiple from "mdi-react/AccountMultipleIcon";
import menu from "../../config/navBar";
import Router from "next/router";

function NavBar(props) {
  const { handleChangeMenuState, activeMenu } = props;
  const handleChange = (item) => {
    Router.push(`/[lang]/[item]`, `/es/${item}`);
  };
  return (
    <section className={styles.NavBar}>
      {/* <article className={styles.NavBar__avatar}>
        <div className={styles.NavBar__userIcon}>
          <AccountCircle color="#1d79be" size={80}></AccountCircle>
          <div
            className={styles.NavBar__title}
          >{`${props.session.first_name} ${props.session.last_name}`}</div>
          <div className={styles.NavBar__profession}></div>
        </div>
      </article> */}
      {menu.map((row, index) => (
        <div
          onClick={() => {
            handleChange(row.slug);
          }}
          key={index}
          className={`${styles.NavBar__item} ${
            activeMenu === row.slug ? styles.NavBar__active : ""
          }`}
        >
          <div>{row.icon}</div>
          <div className={styles.NavBar__itemTitle}>{row.title}</div>
        </div>
      ))}
    </section>
  );
}

export default NavBar;
