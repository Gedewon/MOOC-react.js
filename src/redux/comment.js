import { actionTypes } from "react-redux-form";
import { COMMENTS } from "../shared/comments";

export const Comment = (state = COMMENTS, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
