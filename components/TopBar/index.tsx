import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from "react-redux";
import { cleanUser } from "../../redux/user/userActions";
import { logOut } from "../../services/user";
import { selectUser } from "../../redux/user/userSelectors";
import styles from "./index.module.scss";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function TopBar(props) {
  const logout = async () => {
    try {
      await logOut({
        session_id : props.session.session_id
      })
        .then(async (r) => {
          if (r.data.success) {
            await props.cleanUser()
            Router.push("/", `/`);
          } else {
           console.log(r, 'error') 
          }
        })
        .catch((e) => {
          console.error(e);
        });
        
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.TopBar}>
      <AppBar position="static">
        <Toolbar className={styles.TopBar__nav}>
          {props.menuIcon === undefined || props.menuIcon && (
            <Fragment>
              <IconButton
                edge="start" color="inherit" aria-label="menu"
                onClick={() => {
                  props.openNavBar();
                }}>
                <MenuIcon />
              </IconButton>
              <IconButton
                edge="start" color="inherit" aria-label="menu"
                onClick={logout}>
                <ExitToAppIcon />
              </IconButton>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  session: selectUser(state)
});

const mapDispatchToProps = {
  cleanUser
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

