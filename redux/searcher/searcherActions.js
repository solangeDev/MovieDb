import searcherTypes from './searcherTypes';
import { searchMovie } from '../../services/movies';

//Action Creator
export const setSearcher = (data) => ({
    type: searcherTypes.SET_SEARCHER,
    payload: data,
});

export const setError = (data) => ({
    type: searcherTypes.SET_ERROR,
    payload: data,
});

export const cleanSearcher = () => ({
    type: searcherTypes.CLEAN_SEARCHER,
    payload: [],
});

export const fetchMovies = (payload) => async (dispatch) => {
    try {
        dispatch(setError(false));
        const response = await searchMovie(payload);
        if (response.status === 200) {
            dispatch(setSearcher(response.data));
        } else {
            dispatch(setError(true));
        }
    } catch (error) {
        console.error(error);
        dispatch(setError(true));
    }
};
