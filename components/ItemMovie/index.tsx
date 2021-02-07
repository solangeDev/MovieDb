import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import menu from "../../config/navBar";
import IconButton from "@material-ui/core/IconButton";
import Router from "next/router";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Moment from "moment";

const StyledRating = withStyles({
  label: {
    marginBottom: "0 !important",
  },
  root: {
    fontSize: "20px !important",
    opacity: "inherit !important",
  },
  iconFilled: {
    color: "#1d79be",
  },
  iconHover: {
    color: "#1d79be",
  },
})(Rating);

function ItemMovie(props) {
  const rating = ((parseFloat(props.data.vote_average) * 5) / 10).toPrecision(
    3
  );
  const redirect = () => {
    console.log("redireccion");
  };
  return (
    <section className={styles.ItemMovie}>
      <div className={styles.ItemMovie__container}>
        <div className={styles.ItemMovie__header}>
          <div onClick={redirect} className={styles.ItemMovie__img}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
            ></img>
          </div>
          <div className={styles.ItemMovie__headerDetail}>
            <div className={styles.ItemMovie__titleNav}>
              <div className={styles.ItemMovie__title}>{props.data.title}</div>
              <div
                className={`${
                  props.module === undefined || props.module !== "favorites"
                    ? styles.ItemMovie__like
                    : styles.ItemMovie__hide
                }`}
              >
                <Checkbox
                  icon={<FavoriteBorder />}
                  onChange={(e) => {
                    props.getFavoriteValue(e, props.data);
                  }}
                  checkedIcon={<Favorite />}
                  name="checkedH"
                  checked={props.data.isFavorite}
                />
              </div>
            </div>
            <div className={styles.ItemMovie__subtitle}>
              {`Release: ${Moment(props.data.release_date).format(
                "MMMM Do, YYYY"
              )}`}
            </div>
            <div className={styles.ItemMovie__subtitle}>
              {`Puntuation: ${props.data.vote_average}`}
            </div>
            <div>
              <StyledRating
                value={parseFloat(rating)}
                precision={0.5}
                disabled={true}
                name="simple-controlled"
              />
            </div>
            <div className={styles.ItemMovie__overview}>
              {props.data.overview}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItemMovie;
