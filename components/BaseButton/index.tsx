import React from "react";
import styles from "./index.module.scss";
import Button from "@material-ui/core/Button";

export default function BaseButton(props) {
  let nameClass = `${styles.baseButton} ${
    styles[`baseButton__${props.properties.type}`]
  }`;
  if (
    props.properties.classHover !== undefined &&
    props.properties.hover !== ""
  ) {
    nameClass += ` ${styles[`${props.properties.classHover}`]}`;
  }
  let title = props.properties.title;
  return (
    <Button
      startIcon={props.startIcon}
      type={props.properties.type}
      classes={{
        root: styles[`baseButton__${props.properties.className}`],
      }}
      disabled={props.properties.disabled}
      onClick={props.onClick}
      className={nameClass}
    >
      {title}
    </Button>
  );
}
