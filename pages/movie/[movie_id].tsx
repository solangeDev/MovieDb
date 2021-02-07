import React, { useEffect } from 'react';
import { getMovieDetail } from '../../services/movies';
import MovieDetail from '../../components/MovieDetail';
import { getFavorites } from '../../redux/favoriteMovies/favoriteMoviesSelectors';
import Head from 'next/head';
import { connect } from 'react-redux';

type MovieProps = {
    getFavorites: {
        items: [];
    };
    query: {
        movie_id: number;
    };
};

const Movie: React.FC<MovieProps> = ({ getFavorites, query }: MovieProps) => {
    const [data, setData] = React.useState({});
    const getMovie = async () => {
        let data = await getMovieDetail({ movie_id: query.movie_id });
        if (data.status === 200) {
            data = data.data;
            const valid = getFavorites.items.filter((a) => {
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

Movie.getInitialProps = async ({ query }) => {
    return { query };
};

const mapStateToProps = (state) => ({
    getFavorites: getFavorites(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
