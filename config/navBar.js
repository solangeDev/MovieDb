import MovieOpen from "mdi-react/MovieOpenIcon";
import MovieFilter from "mdi-react/MovieFilterIcon";
import MovieRoll from "mdi-react/MovieRollIcon";
import FolderStar from "mdi-react/FolderStarIcon";

export default [
  {
    icon: <MovieOpen size={24} />,
    title: "Peliculas Recientes",
    slug: "recentMovies",
  },
  {
    icon: <MovieRoll size={24} />,
    title: "Peliculas mejor valoradas",
    slug: "topRatedMovies",
  },
  {
    icon: <MovieFilter size={24} />,
    title: "Peliculas mas vistas",
    slug: "mostViewedMovies",
  },
  {
    icon: <FolderStar size={24} />,
    title: "Favoritos",
    slug: "favorites",
  },
];
