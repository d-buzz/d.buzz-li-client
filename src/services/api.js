import { fetchApi } from "./helper"
import * as ep from "./endpoints"

export let shortenLink = (payload) => fetchApi(
    ep.endpoints.link.shorten.post(payload), payload, 'post')

export let getLongUrl = (payload) => fetchApi(
    ep.endpoints.link.longUrl.get(payload), payload, 'get')