import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { connect } from 'react-redux';
import RecentMoviesLayout from '../containers/RecentMoviesLayout';
import { selectUser } from '../redux/user/userSelectors';

type DashboardProps = {
    session: {
        session_id: string;
    };
};

const Dashboard: React.FC<DashboardProps> = ({ session }: DashboardProps) => {
    useEffect(() => {
        if (session.session_id === '') {
            Router.push('/', '/');
        }
    }, [session]);

    if (session.session_id === '') {
        return null;
    }
    return (
        <div>
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta
                    name="keywords"
                    content="Movies, TV Shows, Streaming, Reviews, API, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
                ></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Moviedb</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <RecentMoviesLayout />
        </div>
    );
};

const mapStateToProps = (state) => ({
    session: selectUser(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
