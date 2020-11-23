import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";
import { reducer as thunkReducer } from "redux-saga-thunk";
import { link } from "./link/reducers";
import { interfaces } from "./interface/reducers";
import { whitelist } from "./whitelist/reducers";
import { auth } from "./auth/reducers";
import * as linkSagas from "./link/sagas"
import * as whitelistSagas from "./whitelist/sagas"
import * as authSagas from "./auth/sagas"

export const rootReducer = combineReducers({
  thunk: thunkReducer,
  link,
  interfaces,
  whitelist,
  auth
});

export function* rootSaga() {
  yield all([
    ...Object.values(linkSagas),
    ...Object.values(whitelistSagas),
    ...Object.values(authSagas),
  ].map(fork));
}
