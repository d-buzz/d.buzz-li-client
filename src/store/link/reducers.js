import { fromJS } from 'immutable'
import {
    SET_SHORT_LINK,
    SET_LONG_LINK,
    SHORTENED_LINK_SUCCESS,
} from "./actions"

const defaultState = fromJS({
  shortLink: null,
  longLink: null,
  shortenedLinkInfo: {}
});

export const link = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_SHORT_LINK:
      return state.set("shortLink", payload);
    case SET_LONG_LINK:
      return state.set("longLink", payload);
    case SHORTENED_LINK_SUCCESS:
      return state.set("shortenedLinkInfo", payload);
    default:
      return state;
  }
};
