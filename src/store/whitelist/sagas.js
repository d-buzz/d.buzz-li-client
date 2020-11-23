import { select, call, put, takeEvery } from "redux-saga/effects";
import {
  GET_DOMAIN_LIST_REQUEST,
  getDomainListSuccess,
  getDomainListFailure,
} from "./actions";
import { getWhitelistedDomains } from "./../../services/api";

function* getDomainListRequest(payload, meta) {
  try {
    let list = [];
    const response = yield getWhitelistedDomains(payload);
    const data = yield response.data;
    if (data.code === 200) {
      const info = data.data;
      list = info.map((x) => {
        x.status = parseInt(x.is_active) === 1 ? "active" : "inactive";
        return x;
      });
    }
    yield put(getDomainListSuccess(list, meta));
  } catch (error) {
    console.log(error);
    yield put(getDomainListFailure(error, meta));
  }
}

function* watchGetDomainListRequest({ payload, meta }) {
  yield call(getDomainListRequest, payload, meta);
}

export default function* sagas() {
  yield takeEvery(GET_DOMAIN_LIST_REQUEST, watchGetDomainListRequest);
}
