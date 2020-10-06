import { createStore, combineReducers, applyMiddleware } from "redux";
import { Dishes } from "./dishes";
import { Comment } from "./comment";
import { Leaders } from "./leader";
import { Promotion } from "./promotion";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comment,
      promotions: Promotion,
      leaders: Leaders,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
