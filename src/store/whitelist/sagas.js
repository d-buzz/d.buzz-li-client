import { select, call, put, takeEvery } from "redux-saga/effects";
import {
  GET_DOMAIN_LIST_REQUEST,
  getDomainListSuccess,
  getDomainListFailure,
  ADD_DOMAIN_REQUEST,
  addDomainSuccess,
  addDomainFailure,
  UPDATE_DOMAIN_REQUEST,
  updateDomainSuccess,
  updateDomainFailure,
  UPDATE_DOMAIN_STATUS_REQUEST,
  updateDomainStatusSuccess,
  updateDomainStatusFailure
} from "./actions";
import {
  getWhitelistedDomains,
  addDomain,
  updateDomain,
  updateDomainStatus
} from "./../../services/api";
import moment from "moment";

function* getDomainListRequest(payload, meta) {
  try {
    let list = [];
    const response = yield getWhitelistedDomains(payload);
    const data = yield response.data;
    if (data.code === 200) {
      const info = data.data;
      list = info.map((x) => {
        x.status = parseInt(x.is_active) === 1 ? "active" : "inactive";
        x.created = moment(x.created_at).format("YYYY/MM/DD h:mm A");
        return x;
      });
    }
    yield put(getDomainListSuccess(list, meta));
  } catch (error) {
    console.log(error);
    yield put(getDomainListFailure(error, meta));
  }
}

function* addDomainRequest(payload, meta) {
  try {
    const { domain } = payload;
    const response = yield addDomain(payload);
    const data = yield response.data;
    yield put(addDomainSuccess(data, meta));
  } catch (error) {
    console.log(error);
    yield put(addDomainFailure(error, meta));
  }
}

function* updateDomainRequest(payload, meta) {
  try {
    const response = yield updateDomain(payload);
    const data = yield response.data;
    yield put(updateDomainSuccess(data, meta));
  } catch (error) {
    console.log(error);
    yield put(updateDomainFailure(error, meta));
  }
}

function* updateDomainStatusRequest(payload, meta) {
  try {
    const response = yield updateDomainStatus(payload);
    const data = yield response.data;
    yield put(updateDomainStatusSuccess(data, meta));
  } catch (error) {
    console.log(error);
    yield put(updateDomainStatusFailure(error, meta));
  }
}

function* watchGetDomainListRequest({ payload, meta }) {
  yield call(getDomainListRequest, payload, meta);
}

function* watchAddDomainRequest({ payload, meta }) {
  yield call(addDomainRequest, payload, meta);
}

function* watchUpdateDomainRequest({ payload, meta }) {
  yield call(updateDomainRequest, payload, meta);
}

function* watchUpdateDomainStatusRequest({ payload, meta }) {
  yield call(updateDomainStatusRequest, payload, meta);
}

export default function* sagas() {
  yield takeEvery(GET_DOMAIN_LIST_REQUEST, watchGetDomainListRequest);
  yield takeEvery(ADD_DOMAIN_REQUEST, watchAddDomainRequest);
  yield takeEvery(UPDATE_DOMAIN_REQUEST, watchUpdateDomainRequest);
  yield takeEvery(UPDATE_DOMAIN_STATUS_REQUEST, watchUpdateDomainStatusRequest);
}
