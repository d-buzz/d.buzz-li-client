import { fromJS } from "immutable"
import {
  BROADCAST_NOTIFICATION,
  SET_CURRENT_PAGE,
} from "./actions"


const defaultState = fromJS({
  notificationBoxData: {},
  currentPage: null,
})

export const interfaces = (state = defaultState, { type, payload }) => {
  switch (type) {
  case BROADCAST_NOTIFICATION:
    return state.set('notificationBoxData', payload)
  case SET_CURRENT_PAGE:
    return state.set('currentPage', payload)
  default:
    return state
  }
}
