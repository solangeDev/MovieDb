import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { connect } from 'react-redux';
import RecentMoviesLayout from '../containers/RecentMoviesLayout';
import { selectUser } from '../redux/user/userSelectors';

function Dashboard(props) {
  useEffect(() => {
    if (props.session.session_id === '') {
      Router.push('/', '/');
    }
  }, [props.session]);

  if (props.session.session_id === '') {
    return null;
  }
  return (
    <div>
      <Head>
        <meta
          httpEquiv="Content-Type"
          content="text / html; charset = utf-8"
        />
        {/* agregar metadadata descripción */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Moviedb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecentMoviesLayout />
    </div>
  );
}

const mapStateToProps = (state) => ({
  session: selectUser(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
