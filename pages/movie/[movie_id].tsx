import React, { useState, useEffect, useContext } from "react";
import { getMovieDetail } from "../../services/movies";
import MovieDetail from "../../components/MovieDetail";
import { getFavorites } from "../../redux/favoriteMovies/favoriteMoviesSelectors";
import { connect } from "react-redux";

const Movie = (props) => {
  const [data, setData] = React.useState({});
  const getMovie = async () => {
    let data = await getMovieDetail({ movie_id: props.query.movie_id });
    if (data.status === 200) {
      data = data.data;
      const valid = props.getFavorites.items.filter((a) => {
        if (a.id === data.id) {
          return a;
        }
      });
      data.isFavorite = valid.lenght > 0;
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
