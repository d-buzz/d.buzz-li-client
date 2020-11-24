import Swal from "sweetalert2";
import appConfig from "./../config"
import axios from 'axios';

export const validateUrl = (str) => {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const fetchApi = async (
  endPoints,
  payload = {},
  methodParams = "POST",
  errorFull = false,
  header = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Custom-Header",
  }
) => {
  axios.defaults.baseURL = appConfig.API_HOST;
  axios.interceptors.request.use(async (request) => {
    // const token = await getUserToken();
    // if (token) {
    //   request.headers.common.Authorization = `${appConfig.TOKEN_PREFIX} ${token}`;
    // }
    return request;
  });

  switch (methodParams.toUpperCase()) {
    case "GET":
      return axios
        .get(appConfig.API_HOST + endPoints, { header })
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          const { response } = error;
          return errorFull ? error : response;
        });

    case "POST":
      return axios
        .post(endPoints, payload, { header })
        .then(function (response) {
          console.log("response", response.data);
          return response;
        })
        .catch(function (error) {
          const { response } = error;
          return errorFull ? error : response;
        });
    default:
      break;
  }
};

export const setItemLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItemLocalStorage = (key) => {
  return localStorage.getItem(key)
};

export const removeItemLocalStorage = (key) => {
   localStorage.removeItem(key)
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const swalBasicFire = (title, description, icon) => {
  Swal.fire(title, description, icon);
};

export const swalToastFire = (title, icon) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
};