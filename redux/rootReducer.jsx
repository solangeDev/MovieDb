import userReducer from "./user/userReducer";
import favoriteMoviesReducer from "./favoriteMovies/favoriteMoviesReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [], //not persistent
};

const rootReducer = combineReducers({
  user: userReducer,
  favoriteMovies: favoriteMoviesReducer,
});

export default persistReducer(persistConfig, rootReducer);
