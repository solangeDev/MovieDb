import React, { useEffect } from 'react';
import { getMovieDetail } from '../../services/movies';
import MovieDetail from '../../components/MovieDetail';
import { getFavorites } from '../../redux/favoriteMovies/favoriteMoviesSelectors';
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

    return <MovieDetail data={data}></MovieDetail>;
};

Movie.getInitialProps = async ({ query }) => {
    return { query };
};

const mapStateToProps = (state) => ({
    getFavorites: getFavorites(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
