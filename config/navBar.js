/* eslint-disable react/react-in-jsx-scope */
import MovieOpen from 'mdi-react/MovieOpenIcon';
import MovieFilter from 'mdi-react/MovieFilterIcon';
import MovieRoll from 'mdi-react/MovieRollIcon';
import FolderStar from 'mdi-react/FolderStarIcon';

export default [
    {
        icon: <MovieOpen size={24} />,
        title: 'Recent Movies',
        slug: 'dashboard',
    },
    {
        icon: <MovieRoll size={24} />,
        title: 'Top rated movies',
        slug: 'topmovies',
    },
    {
        icon: <MovieFilter size={24} />,
        title: 'Most viewed movies',
        slug: 'popularmovies',
    },
    {
        icon: <FolderStar size={24} />,
        title: 'Favorites',
        slug: 'favorites',
    },
];
