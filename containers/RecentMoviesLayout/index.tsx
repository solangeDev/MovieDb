import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import TopBar from '../../components/TopBar';
import NavBar from "../../components/NavBar";
import { Animated } from "react-animated-css";

export default function DashboardLayout(props) {

  const [openNavBar, setOpenNavBar] = useState(true);
  const [activeMenu, setActiveMenu] = useState("recentMovies");
  const [width, setWidth] = useState(process.browser ? window.innerWidth : 0);

  useEffect(() => {
    function handleResize() {
      setWidth(process.browser ? window.innerWidth : 0);
    }
    process.browser ? window.addEventListener("resize", handleResize) : null;
    return () =>
      process.browser
        ? window.removeEventListener("resize", handleResize)
        : null;
  }, [width]);

  useEffect(() => {
    if (width >= 1280) {
      setOpenNavBar(true);
    } else {
      setOpenNavBar(false);
    }
  }, [width]);

  const handleChangeOpenBar = (e) => {
    setOpenNavBar((oldState) => !oldState);
  };

  const handleChangeMenuState = (e) => {
    setActiveMenu(e);
  };

  useEffect(() => {}, [activeMenu]);
  
  return (
    <div>
      <TopBar menuIcon={true} openNavBar={handleChangeOpenBar} open={openNavBar}/>
      <article
          className={`${styles.Dashboard__sideBar} ${
            !openNavBar ? styles.Dashboard__notZIndex : ""
          }`}
        >
          <Animated
            animationIn="slideInLeft" //bounceOutLeft
            animationOut="slideOutLeft"
            animationInDuration={400}
            animationOutDuration={350}
            isVisible={openNavBar}
          >
            <NavBar
              activeMenu={activeMenu}
              handleChangeMenuState={handleChangeMenuState}
            ></NavBar>
          </Animated>
        </article>
    </div>
  );
}
