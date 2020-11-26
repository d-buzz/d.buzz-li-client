import { fetchApi } from "./helper"
import * as ep from "./endpoints"

export let shortenLink = (payload) => fetchApi(
    ep.endpoints.link.shorten.post(payload), payload, 'post')

export let getLongUrl = (payload) => fetchApi(
    ep.endpoints.link.longUrl.get(payload), payload, 'get')

export let getWhitelistedDomains = (payload) => fetchApi(
    ep.endpoints.whitelist.list.get(payload), payload, 'get')

export let addDomain = (payload) => fetchApi(
    ep.endpoints.whitelist.add.post(payload), payload, 'post')

export let updateDomain = (payload) => fetchApi(
    ep.endpoints.whitelist.update.post(payload), payload, 'post')

export let updateDomainStatus = (payload) => fetchApi(
    ep.endpoints.whitelist.statusUpdate.post(payload), payload, 'post')

export let authenticateUser = (payload) => fetchApi(
    ep.endpoints.auth.login.post(payload), payload, 'post')