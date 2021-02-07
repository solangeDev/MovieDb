import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { selectUser } from "../../redux/user/userSelectors";
import { connect } from "react-redux";
import menu from "../../config/navBar";
import Router from "next/router";
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import { Animated } from "react-animated-css";

function MovieDetail(props) {
  const [openNavBar, setOpenNavBar] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
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
    if (width <= 768) {
      setOpenNavBar(false);
    } else {
      setOpenNavBar(true);
    }
  }, [width]);

  const handleChangeOpenBar = (e) => {
    setOpenNavBar((oldState) => !oldState);
  };

  const handleChangeMenuState = (e) => {
    setActiveMenu(e);
  };

  useEffect(() => {}, [activeMenu]);

  // useEffect(() => {
  //   const imagen = document.getElementById("container");
  //   imagen.style.backgroundImage =
  //     "url('https://image.tmdb.org/t/p/w500//52AfXWuXCHn3UjD17rBruA9f5qb.jpg')";
  //   // imagen.style.backgroundSize = "cover";
  //   imagen.style.backgroundAttachment = "fixed";
  //   imagen.style.backgroundRepeat = "no-repeat";
  //   imagen.style.opacity = "0.4";
  //   imagen.style.height = "100vh";
  // }, []);

  console.log(props.data);
  return (
    <div>
      <TopBar
        menuIcon={true}
        openNavBar={handleChangeOpenBar}
        open={openNavBar}
      />
      <section className={`${styles.Movie__body}`}>
        <article
          className={`${styles.Movie__sideBar} ${
            !openNavBar ? styles.Movie__notZIndex : ""
          }`}
        >
          <Animated
            animationIn="slideInLeft" //bounceOutLeft
            animationOut="slideOutLeft"
            animationInDuration={400}
            animationOutDuration={110}
            isVisible={openNavBar}
          >
            <NavBar
              activeMenu={activeMenu}
              handleChangeMenuState={handleChangeMenuState}
            ></NavBar>
          </Animated>
        </article>
        <article className={styles.Movie__feed}>
          <div className={styles.Movie__background}>
            <img src="https://image.tmdb.org/t/p/w500//52AfXWuXCHn3UjD17rBruA9f5qb.jpg"></img>
            <div className={styles.Movie__opacity}></div>
            <div className={styles.Movie__description}>
             <div className={styles.Movie__descriptionImage}>
               <img src="https://picsum.photos/200/300" alt="movie-picture"/>
             </div>
             <div className={styles.Movie__descriptionText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore blanditiis quas ut sunt non, autem, atque nihil, accusamus deleniti dolorem recusandae eos saepe debitis nobis sed possimus cum laboriosam. Cumque?</div> 
            </div>
          </div>

          <div></div>
        </article>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  session: selectUser(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
