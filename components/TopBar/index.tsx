import React, { useState, useEffect, Fragment } from "react";
import AccountCircle from "mdi-react/AccountCircleIcon";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { connect } from "react-redux";
import { cleanUser } from "../../redux/user/userActions";
import { logOut } from "../../services/user";
import { selectUser } from "../../redux/user/userSelectors";
import styles from "./index.module.scss";
import Link from "next/link";
import Router from "next/router";

function TopBar(props) {
  const logout = async () => {
    try {
      await logOut({
        session_id: props.session.session_id,
      })
        .then(async (r) => {
          if (r.data.success) {
            await props.cleanUser();
            Router.push("/", `/`);
          } else {
            console.log(r, "error");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.TopBar}>
      <AppBar position="static">
        <Toolbar className={styles.TopBar__nav}>
          <Fragment>
            <div>
              <div className={styles.TopBar__navRight}>
                <div className={styles.TopBar__iconDrawer}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => {
                      props.openNavBar();
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <Link href="/dashboard" as={`/dashboard`}>
                  <div className={styles.TopBar__title}>Moviedb</div>
                </Link>
              </div>
            </div>
            <div className={styles.TopBar__navRight}>
              <div className={styles.TopBar__avatar}>
                <div>
                  <AccountCircle color="#ffffff" size={30}></AccountCircle>
                </div>
                <div>{props.session.account.username}</div>
              </div>
              <div>
                <IconButton
                  classes={{
                    root: styles.TopBar__buttonRoot,
                  }}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={logout}
                >
                  <ExitToAppIcon />
                </IconButton>
              </div>
            </div>
          </Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  session: selectUser(state),
});

const mapDispatchToProps = {
  cleanUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
