export const BROADCAST_NOTIFICATION = "BROADCAST_NOTIFICATION"

export const broadcastNotification = (severity, message) => ({
  type: BROADCAST_NOTIFICATION,
  payload: { open: true, severity, message },
})

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
})
