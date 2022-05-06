import {
  ID_IMAGE_MAP,
  PERMISSION_ADMIN,
  PERMISSION_DULEAD,
  PERMISSION_MEMBER,
} from "../constants/common";
import { HTTP_CREATE } from "../constants/Http";
import { getStorage, history } from "../http";
import { getSessionStorage } from "../http/storage/sessionStorage";
import { callAPI } from "./HttpService";

export const convertColor = (status) => {
  switch (status) {
    case "approve":
    case "available":
      return "#36B37E";
    case "pending":
    case "booked":
      return "#0065FF";
    case "allocated":
      return "#FFAB00";
    case "reject":
    case "occupied":
      return "#FF5630";
    default:
      return "#5243AA";
  }
};

export const convertTicketColor = (status) => {
  switch (status) {
    case "book":
      return "geekblue";
    case "claim":
      return "volcano";
    case "extend":
      return "green";
    default:
      return "purple";
  }
};

export const convertStatusCode = (status) => {
  switch (status) {
    case 400:
      return "The request was invalid";
    case 401:
      return "The request did not include an authentication token or the authentication token was expired";
    case 403:
      return "The client did not have permission to access the requested resource";
    case 404:
      return "The requested resource was not found";
    case 405:
      return "The HTTP method in the request was not supported by the resource";
    case 500:
      return "The request was not completed due to an internal error on the server side";
    case 503:
      return "The server was unavailable";
    default:
      return "The request was error";
  }
};

export const convertTicketType = (statusDot) => {
  switch (statusDot) {
    case "allocated":
      return "claim";
    case "available":
      return "book";
    default:
      return "book";
  }
};

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const uniqBy = (array, key) => {
  var seen = {};
  return array.filter(function (item) {
    var k = key(item);
    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  });
};

export const onKeyPressNotAllowedSpecialCharacters = (e) => {
  const specialCharRegex = new RegExp("[a-zA-Z0-9@.' ,-]");
  const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (!specialCharRegex.test(pressedKey)) {
    e.preventDefault();
    return false;
  }
};

export const isAdmin = () => {
  return getStorage("user")?.roles?.[0]?.name === PERMISSION_ADMIN;
};

export const isDuLead = () => {
  return getStorage("user")?.roles?.[0]?.name === PERMISSION_DULEAD;
};

export const isMember = () => {
  return (
    getStorage("user")?.roles?.[0]?.name !== PERMISSION_ADMIN &&
    getStorage("user")?.roles?.[0]?.name !== PERMISSION_DULEAD
  );
};

export const isAdminOrDuLead = () => {
  return (
    getStorage("user")?.roles?.[0]?.name === PERMISSION_ADMIN ||
    getStorage("user")?.roles?.[0]?.name === PERMISSION_DULEAD
  );
};

export const checkPermission = (listPermission, key) => {
  let permissions = listPermission.map((ele) => ele.name);
  return permissions.includes(key);
};

export const logoutHandle = async () => {
  await callAPI(HTTP_CREATE, "auth/logout");
  localStorage.clear();
  sessionStorage.clear();
  history.push({
    pathname: "/login",
    state: { from: { pathname: location.pathname } },
  });
};

export const onEnterEvent = (e, cb) => {
  if (e.key === "Enter") {
    cb();
  }
};
