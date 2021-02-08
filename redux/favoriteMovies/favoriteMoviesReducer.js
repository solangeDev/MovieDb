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
        case favoriteMoviesTypes.ADD_FAVORITE:
            const newArr = state.items;
            newArr.push({ ...action.payload });
            return {
                ...state,
                items: newArr,
            };
        case favoriteMoviesTypes.REMOVE_FAVORITE:
            const newArr2 = state.items.filter((a) => {
                if (a.id !== action.payload.id) {
                    return a;
                }
            });
            return {
                ...state,
                items: newArr2,
            };
        default:
            return state;
    }
};

export default favoriteMoviesReducer;
