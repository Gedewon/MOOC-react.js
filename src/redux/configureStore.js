import { createStore, combineReducers } from "redux";
import { Dishes } from "./dishes";
import { Comment } from "./comment";
import { Leaders } from "./leader";
import { Promotion } from "./promotion";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comment,
      promotions: Promotion,
      leaders: Leaders,
    })
  );

  return store;
};
