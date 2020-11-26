export const GET_DOMAIN_LIST_REQUEST = "GET_DOMAIN_LIST_REQUEST";
export const GET_DOMAIN_LIST_SUCCESS = "GET_DOMAIN_LIST_SUCCESS";
export const GET_DOMAIN_LIST_FAILURE = "GET_DOMAIN_LIST_FAILURE";

export const ADD_DOMAIN_REQUEST = "ADD_DOMAIN_REQUEST";
export const ADD_DOMAIN_SUCCESS = "ADD_DOMAIN_SUCCESS";
export const ADD_DOMAIN_FAILURE = "ADD_DOMAIN_FAILURE";

export const UPDATE_DOMAIN_REQUEST = "UPDATE_DOMAIN_REQUEST";
export const UPDATE_DOMAIN_SUCCESS = "UPDATE_DOMAIN_SUCCESS";
export const UPDATE_DOMAIN_FAILURE = "UPDATE_DOMAIN_FAILURE";

export const UPDATE_DOMAIN_STATUS_REQUEST = "UPDATE_DOMAIN_STATUS_REQUEST";
export const UPDATE_DOMAIN_STATUS_SUCCESS = "UPDATE_DOMAIN_STATUS_SUCCESS";
export const UPDATE_DOMAIN_STATUS_FAILURE = "UPDATE_DOMAIN_STATUS_FAILURE";

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

export const addDomainRequest = (domain) => ({
  type: ADD_DOMAIN_REQUEST,
  payload: { domain },
  meta: {
    thunk: true,
  },
});

export const addDomainSuccess = (response, meta) => ({
  type: ADD_DOMAIN_SUCCESS,
  payload: response,
  meta,
});

export const addDomainFailure = (error, meta) => ({
  type: ADD_DOMAIN_FAILURE,
  payload: error,
  meta,
});

export const updateDomainRequest = (domain_id, domain) => ({
  type: UPDATE_DOMAIN_REQUEST,
  payload: { domain_id, domain },
  meta: {
    thunk: true,
  },
});

export const updateDomainSuccess = (response, meta) => ({
  type: UPDATE_DOMAIN_SUCCESS,
  payload: response,
  meta,
});

export const updateDomainFailure = (error, meta) => ({
  type: UPDATE_DOMAIN_FAILURE,
  payload: error,
  meta,
});


export const updateDomainStatusRequest = (domain_id, status) => ({
  type: UPDATE_DOMAIN_STATUS_REQUEST,
  payload: { domain_id, status },
  meta: {
    thunk: true,
  },
});

export const updateDomainStatusSuccess = (response, meta) => ({
  type: UPDATE_DOMAIN_STATUS_SUCCESS,
  payload: response,
  meta,
});

export const updateDomainStatusFailure = (error, meta) => ({
  type: UPDATE_DOMAIN_STATUS_FAILURE,
  payload: error,
  meta,
});