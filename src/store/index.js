import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";
import { reducer as thunkReducer } from "redux-saga-thunk";
import { link } from "./link/reducers";
import * as linkSagas from "./link/sagas";

export const rootReducer = combineReducers({
  thunk: thunkReducer,
  link,
});

export function* rootSaga() {
  yield all([...Object.values(linkSagas)].map(fork));
}
