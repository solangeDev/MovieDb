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
            const favorites = payload.getFavorites;
            const newList = response.data.results.map((a) => {
                let b = { ...a };
                const valid = favorites.items.filter((c) => {
                    if (c.id === b.id) {
                        return c;
                    }
                });
                a.isFavorite = valid.lenght > 0;
                return b;
            });
            response.data.results = newList;
            dispatch(setSearcher(response.data));
        } else {
            dispatch(setError(true));
        }
    } catch (error) {
        console.error(error);
        dispatch(setError(true));
    }
};
