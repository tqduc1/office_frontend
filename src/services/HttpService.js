import { PERMISSION_MEMBER } from "../constants/common";
import { HTTP_READ, HTTP_DELETE } from "../constants/Http";
import { getToken, getStorage } from "../http/storage/localStorage";
import { logoutHandle } from "./common";

const authHeader = (verify) => {
  const token = getToken();
  if (verify) {
    return { Authorization: `${token}` };
  } else {
    return {};
  }
};

const makeRequest = (subUri, params) => {
  var url = `${process.env.API}/${subUri}?role=${
    getStorage("menuTabs")?.[0]?.role === "default"
      ? PERMISSION_MEMBER
      : getStorage("menuTabs")?.[0]?.role
  }&`;
  var Uri = "";
  if (params) {
    Object.keys(params).forEach((key) => {
      Uri += key + "=" + params[key] + "&";
    });
  }

  return url + Uri;
};
function callAPI(method, subUri, queryParams = {}, body = {}, isVerify = true) {
  let requestOptions = {
    method,
    headers: authHeader(isVerify),
  };
  if (method !== HTTP_READ && method !== HTTP_DELETE) {
    requestOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeader(isVerify),
      },
      body: JSON.stringify(body),
    };
  }
  return new Promise((resolve, reject) => {
    fetch(makeRequest(subUri, queryParams), requestOptions)
      .then((response) => {
        if (!response.ok) {
          if ([401].includes(response.status)) {
            logoutHandle();
          }
          return response.json();
        } else {
          return response.json() || { success: true };
        }
      })
      .then((responseJson) => {
        if (responseJson.success || responseJson.status) {
          resolve(responseJson);
        } else {
          throw Error(
            responseJson.message ||
              responseJson.error ||
              responseJson.errorMessage
          );
        }
      })
      .catch((error) => reject(error));
  });
}

export { callAPI };
