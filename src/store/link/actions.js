export const SHORTENED_LINK_REQUEST = "SHORTENED_LINK_REQUEST";
export const SHORTENED_LINK_SUCCESS = "SHORTENED_LINK_SUCCESS";
export const SHORTENED_LINK_FAILURE = "SHORTENED_LINK_FAILURE";

export const SET_SHORT_LINK = "SET_SHORT_LINK";
export const SET_LONG_LINK = "SET_LONG_LINK";

export const shortenLinkRequest = (link) => ({
  type: SHORTENED_LINK_REQUEST,
  payload: { link },
});

export const shortenedLinkSuccess = (response) => ({
  type: SHORTENED_LINK_SUCCESS,
  payload: response,
});

export const shortenedLinkFailure = (error) => ({
  type: SHORTENED_LINK_FAILURE,
  payload: error,
});

export const setShortLink = (response) => ({
  type: SET_SHORT_LINK,
  payload: response,
});

export const setLongLink = (response) => ({
  type: SET_LONG_LINK,
  payload: response,
});
