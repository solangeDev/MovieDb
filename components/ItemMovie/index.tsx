import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import menu from "../../config/navBar";
import Router from "next/router";
import Moment from 'moment';

function ItemMovie(props) {
  const redirect= ()=>{
    console.log('redireccion')
  }
  return (
    <section className={styles.ItemMovie}>
      <div className={styles.ItemMovie__container}>
        <div className={styles.ItemMovie__header} >
          <div onClick={redirect} className={styles.ItemMovie__img}>
            <img src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}></img>
          </div>
          <div className={styles.ItemMovie__headerDetail}>
            <div className={styles.ItemMovie__titleNav} >
              <div className={styles.ItemMovie__title}>{props.data.title}</div>
              <div className={styles.ItemMovie__like}>Favorito</div>
            </div>
            <div className={styles.ItemMovie__subtitle} >
              {`Release: ${Moment(props.data.release_date).format('MMMM Do, YYYY')}`}
            </div>
            <div className={styles.ItemMovie__subtitle} >
              {`Puntuation: ${props.data.vote_average}`}
            </div>
            <div className={styles.ItemMovie__overview} >
              {props.data.overview}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItemMovie;
