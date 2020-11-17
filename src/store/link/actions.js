export const SHORTEN_LINK_REQUEST = "SHORTEN_LINK_REQUEST";
export const SHORTENED_LINK_SUCCESS = "SHORTENED_LINK_SUCCESS";
export const SHORTENED_LINK_FAILURE = "SHORTENED_LINK_FAILURE";

export const SET_SHORT_LINK = "SET_SHORT_LINK";
export const SET_LONG_LINK = "SET_LONG_LINK";

export const shortenLinkRequest = (url) => ({
  type: SHORTEN_LINK_REQUEST,
  payload: { url },
  meta: {
    thunk: true,
  },
});

export const shortenedLinkSuccess = (response, meta) => ({
  type: SHORTENED_LINK_SUCCESS,
  payload: response,
  meta
});

export const shortenedLinkFailure = (error, meta) => ({
  type: SHORTENED_LINK_FAILURE,
  payload: error,
  meta
});

export const setShortLink = (response) => ({
  type: SET_SHORT_LINK,
  payload: response,
});

export const setLongLink = (response) => ({
  type: SET_LONG_LINK,
  payload: response,
});
