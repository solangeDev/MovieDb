import favoriteMoviesTypes from './favoriteMoviesTypes';

const initialState = {
    items: [],
    error: false,
};

const favoriteMoviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case favoriteMoviesTypes.SET_FAVORITE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default favoriteMoviesReducer;
