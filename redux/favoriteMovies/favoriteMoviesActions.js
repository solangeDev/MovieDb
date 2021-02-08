import favoriteMoviesTypes from './favoriteMoviesTypes';
import { listFavoriteMovies } from '../../services/movies';

export const setFavorite = (data) => ({
    type: favoriteMoviesTypes.SET_FAVORITE,
    payload: data,
});

export const removeFavorite = (data) => ({
    type: favoriteMoviesTypes.REMOVE_FAVORITE,
    payload: data,
});

export const addFavorite = (data) => ({
    type: favoriteMoviesTypes.ADD_FAVORITE,
    payload: data,
});

export const fetchFavorites = (payload) => async (dispatch) => {
    try {
        const response = await listFavoriteMovies(payload);
        if (response.status === 200) {
            let arr = [];
            let invalid = false;
            for (let i = response.data.page; i <= response.data.total_pages; i++) {
                payload.page = i;
                const data = await listFavoriteMovies(payload);
                if (data.status === 200) {
                    arr = [...arr, ...data.data.results];
                } else {
                    invalid = true;
                }
            }
            if (!invalid) {
                dispatch(setFavorite({ items: arr, error: false }));
            }
        } else {
            dispatch(setFavorite({ items: [], error: true }));
        }
    } catch (error) {
        dispatch(setFavorite({ items: [], error: true }));
        console.log(error);
    }
};
