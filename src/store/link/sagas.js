import { select, call, put, takeEvery } from "redux-saga/effects"
import {
    SHORTENED_LINK_REQUEST,
    shortenedLinkSuccess,
    shortenedLinkFailure
} from "./actions"

function *shortenLinkRequest(payload) {
    try {
        yield put(shortenedLinkSuccess(true))
    } catch (error) {
        yield put(shortenedLinkFailure(error))
    }
}

function* watchShortenLinkRequest({ payload }) {
    yield call(shortenLinkRequest, payload)
  }

export default function* sagas() {
    yield takeEvery(SHORTENED_LINK_REQUEST, watchShortenLinkRequest)
}