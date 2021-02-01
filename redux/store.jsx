import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

const middlewares = [];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares, thunk)
);
export const persistor = persistStore(store);
export default { store, persistor };
