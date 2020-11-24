export const endpoints = {
  auth : {
    login : {
      post(payload) {
        return "/auth/login"
      }
    }
  },
  link  : {
    shorten: {
      post(payload) {
        return "/url/shorten";
      },
    },
    longUrl: {
      get(payload) {
        return `/url/${payload.keyword}`;
      },
    },
  },
  whitelist: {
    list: {
      get(payload) {
        return `/whitelist/list/${payload.limit}/${payload.offset}`;
      },
    },
    add: {
      post(payload) {
        return "/whitelist/add";
      },
    },
    update: {
      post(payload) {
        return "/whitelist/update";
      },
    },
    statusUpdate: {
      post(payload) {
        return "/whitelist/status-update";
      },
    },
  },
};
