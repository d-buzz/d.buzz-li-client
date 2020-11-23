export const GET_DOMAIN_LIST_REQUEST = "GET_DOMAIN_LIST_REQUEST";
export const GET_DOMAIN_LIST_SUCCESS = "GET_DOMAIN_LIST_SUCCESS";
export const GET_DOMAIN_LIST_FAILURE = "GET_DOMAIN_LIST_FAILURE";

export const getDomainListRequest = (limit = 100, offset = 0) => ({
  type: GET_DOMAIN_LIST_REQUEST,
  payload: { limit, offset },
  meta: {
    thunk: true,
  },
});

export const getDomainListSuccess = (response, meta) => ({
  type: GET_DOMAIN_LIST_SUCCESS,
  payload: response,
  meta,
});

export const getDomainListFailure = (error, meta) => ({
  type: GET_DOMAIN_LIST_FAILURE,
  payload: error,
  meta,
});
