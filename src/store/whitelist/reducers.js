import { fromJS } from "immutable";
import {
  GET_DOMAIN_LIST_SUCCESS,
} from "./actions";

const defaultState = fromJS({
  domainList: [],
});

export const whitelist = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_DOMAIN_LIST_SUCCESS:
      return state.set("domainList", payload);
    default:
      return state;
  }
};
