import MovieOpen from "mdi-react/MovieOpenIcon";
import MovieFilter from "mdi-react/MovieFilterIcon";
import MovieRoll from "mdi-react/MovieRollIcon";
import FolderStar from "mdi-react/FolderStarIcon";
import MonitorDashboard from "mdi-react/MonitorDashboardIcon";

export default [
  {
    icon: <MovieOpen size={24} />,
    title: "Peliculas Recientes",
    slug: "dashboard",
  },
  {
    icon: <MovieRoll size={24} />,
    title: "Peliculas mejor valoradas",
    slug: "topmovies",
  },
  {
    icon: <MovieFilter size={24} />,
    title: "Peliculas mas vistas",
    slug: "popularmovies",
  },
  {
    icon: <FolderStar size={24} />,
    title: "Favoritos",
    slug: "favorites",
  },
];
