import { select, call, put, takeEvery } from "redux-saga/effects"
import {
    SHORTEN_LINK_REQUEST,
    shortenedLinkSuccess,
    shortenedLinkFailure,
    setShortLink,
    clearShortenLinkError
} from "./actions"
import{
    shortenLink
} from "./../../services/api"
import appConfig from "./../../config"

function* shortenLinkRequest(payload, meta) {
    try {
        let shortUrl = null;
        const response = yield shortenLink(payload)
        const data = yield response.data
        if(data.code === 200){
            shortUrl = `${appConfig.APP_HOST}/${data.data.keyword}`
            yield put(setShortLink(shortUrl))
        }
        const info = {
            shortenedLink: shortUrl,
            statusCode: data.code,
            message: data.message
        }
        yield put(shortenedLinkSuccess(info, meta))
    } catch (error) {
        console.log(error)
        yield put(shortenedLinkFailure(error, meta))
    }
}

function* watchShortenLinkRequest({ payload, meta }) {
    yield call(shortenLinkRequest, payload, meta)
  }

export default function* sagas() {
    yield takeEvery(SHORTEN_LINK_REQUEST, watchShortenLinkRequest)
}