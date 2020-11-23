export const SHORTEN_LINK_REQUEST = "SHORTEN_LINK_REQUEST";
export const SHORTENED_LINK_SUCCESS = "SHORTENED_LINK_SUCCESS";
export const SHORTENED_LINK_FAILURE = "SHORTENED_LINK_FAILURE";

export const GET_ORIG_LINK_REQUEST = "GET_ORIG_LINK_REQUEST";
export const GET_ORIG_LINK_SUCCESS = "GET_ORIG_LINK_SUCCESS";
export const GET_ORIG_LINK_FAILURE = "GET_ORIG_LINK_FAILURE";

export const SET_SHORT_LINK = "SET_SHORT_LINK";
export const SET_LONG_LINK = "SET_LONG_LINK";
export const CLEAR_SHORTENED_LINK = "CLEAR_SHORTENED_LINK";

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
  meta,
});

export const shortenedLinkFailure = (error, meta) => ({
  type: SHORTENED_LINK_FAILURE,
  payload: error,
  meta,
});

export const getOrigLinkRequest = (keyword) => ({
  type: GET_ORIG_LINK_REQUEST,
  payload: { keyword },
  meta: {
    thunk: true,
  },
});

export const getOrigLinkSuccess = (response, meta) => ({
  type: GET_ORIG_LINK_SUCCESS,
  payload: response,
  meta,
});

export const getOrigLinkFailure = (error, meta) => ({
  type: GET_ORIG_LINK_FAILURE,
  payload: error,
  meta,
});

export const setShortLink = (response) => ({
  type: SET_SHORT_LINK,
  payload: response,
});

export const setLongLink = (response) => ({
  type: SET_LONG_LINK,
  payload: response,
});

export const clearShortenedLink = () => ({
  type: CLEAR_SHORTENED_LINK,
});
