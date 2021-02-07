import React, { useEffect } from 'react';
import Head from 'next/head';
import FavoriteMoviesLayout from '../containers/FavoriteMoviesLayout';
import { selectUser } from '../redux/user/userSelectors';
import Router from 'next/router';
import { connect } from 'react-redux';

type TopMoviesProps = {
    session: {
        session_id: string;
    };
};

const TopMovies: React.FC<TopMoviesProps> = ({ session }: TopMoviesProps) => {
    useEffect(() => {
        if (session.session_id === '') {
            Router.push('/', `/`);
        }
    }, [session]);

    if (session.session_id === '') {
        return null;
    } else {
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
                <FavoriteMoviesLayout />
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    session: selectUser(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TopMovies);
