export const AUTHENTICATE_USER_REQUEST = "AUTHENTICATE_USER_REQUEST";
export const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
export const AUTHENTICATE_USER_FAILURE = "AUTHENTICATE_USER_FAILURE";

export const SIGNOUT_USER_REQUEST = "SIGNOUT_USER_REQUEST";
export const SIGNOUT_USER_SUCCESS = "SIGNOUT_USER_SUCCESS";
export const SIGNOUT_USER_FAILURE = "SIGNOUT_USER_FAILURE";

export const authenticateUserRequest = (username, password) => ({
  type: AUTHENTICATE_USER_REQUEST,
  payload: { username, password },
  meta: {
    thunk: true,
  },
});

export const authenticateUserSuccess = (response, meta) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  payload: response,
  meta,
});

export const authenticateUserFailure = (error, meta) => ({
  type: AUTHENTICATE_USER_FAILURE,
  payload: error,
  meta,
});

export const signoutUserRequest = () => ({
  type: SIGNOUT_USER_REQUEST,
  meta: {
    thunk: true,
  },
});

export const signoutUserSuccess = (response, meta) => ({
  type: SIGNOUT_USER_SUCCESS,
  payload: response,
  meta,
});

export const signoutUserFailure = (error, meta) => ({
  type: SIGNOUT_USER_FAILURE,
  payload: error,
  meta,
});
