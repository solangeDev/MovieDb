import userReducer from './user/userReducer';
import favoriteMoviesReducer from './favoriteMovies/favoriteMoviesReducer';
import searcherReducer from './searcher/searcherReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['favoriteMovies', 'searcherReducer'], //not persistent
};

const rootReducer = combineReducers({
    user: userReducer,
    favoriteMovies: favoriteMoviesReducer,
    searcherReducer: searcherReducer,
});

export default persistReducer(persistConfig, rootReducer);
