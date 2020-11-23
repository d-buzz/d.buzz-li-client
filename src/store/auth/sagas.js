import { select, call, put, takeEvery } from "redux-saga/effects";
import {
  AUTHENTICATE_USER_REQUEST,
  authenticateUserSuccess,
  authenticateUserFailure,
} from "./actions";
import { setItemLocalStorage, packLoginData } from "./../../services/helper"
// import { getWhitelistedDomains } from "./../../services/api";

function* authenticateUserRequest(payload, meta) {
  try {
    const { username, password } = payload;
    const user = { username, is_authenticated: false }
    user.is_authenticated = true;
    user.login_data = yield call(packLoginData,username, password)
    console.log(user)
    // yield call(setItemLocalStorage,'user',JSON.stringify(user))
    yield put(authenticateUserSuccess(user, meta));
  } catch (error) {
    console.log(error);
    yield put(authenticateUserFailure(error, meta));
  }
}

function* watchAuthenticateUserRequest({ payload, meta }) {
  yield call(authenticateUserRequest, payload, meta);
}

export default function* sagas() {
  yield takeEvery(AUTHENTICATE_USER_REQUEST, watchAuthenticateUserRequest);
}
