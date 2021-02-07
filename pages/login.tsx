import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import LoginView from "../containers/LoginView";
import Router from "next/router";
import { selectUser } from "../redux/user/userSelectors";
import { connect } from "react-redux";
import RecentMoviesLayout from "../containers/RecentMoviesLayout";

function Login(props) {
  const [loginWrapper, setLoginWrapper] = useState(false);
  useEffect(() => {
    setLoginWrapper(props.session.session_id === "");
    if (props.session.session_id !== "") {
      Router.push("/dashboard", `/dashboard`);
    }
  }, [props.session]);

  return (
    <div>
      <Head>
        <meta httpEquiv="Content-Type" content="text / html; charset = utf-8" />
        {/* agregar metadadata descripción */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Moviedb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loginWrapper && <LoginView />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  session: selectUser(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
