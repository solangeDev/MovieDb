import React, { useEffect, useState } from 'react';
import { getMovieDetail } from '../../services/movies';
import MovieDetail from '../../components/MovieDetail';
import { getFavorites } from '../../redux/favoriteMovies/favoriteMoviesSelectors';
import Head from 'next/head';
import { connect } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import { string } from 'yup';

interface DataProps {
    overview: string;
}
interface Props {
    context?: {
        movie_id: string;
        getFavorites: {
            items: [{ id: number }];
        };
    };
}

const Movie: NextPage<Props> = (context) => {
    const [data, setData] = useState<DataProps>({
        overview: '',
    });
    const getMovie = async () => {
        let data = await getMovieDetail({ movie_id: context.movie_id });
        if (data.status === 200) {
            data = data.data;
            const valid = context.getFavorites.items.filter((a) => {
                if (a.id === data.id) {
                    return a;
                }
            });
            data.isFavorite = valid.length > 0;
            setData({ ...data, data });
        }
    };
    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div>
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="description" content={data.overview}></meta>
                <meta
                    name="keywords"
                    content="Movies, TV Shows, Streaming, Reviews, API, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
                ></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Moviedb</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MovieDetail data={data}></MovieDetail>;
        </div>
    );
};

Movie.getInitialProps = async (context) => {
    return context.query;
};

const mapStateToProps = (state) => ({
    getFavorites: getFavorites(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
