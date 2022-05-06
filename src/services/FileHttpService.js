import { HTTP_CREATE } from "../constants/Http";
import { convertStatusCode, logoutHandle } from "./common";

function fetchAPIFile(subUri, params, body) {
  const requestOptions = {
    method: HTTP_CREATE,
    body: body,
  };
  return new Promise((resolve, reject) => {
    let url = `${process.env.API_MEDIA}/${subUri}?`;
    let Uri = "";
    if (params) {
      Object.keys(params).forEach((key) => {
        Uri += key + "=" + params[key] + "&";
      });
    }
    fetch(url + Uri.substring(0, Uri.length - 1), requestOptions)
      .then((response) => {
        if (!response.ok) {
          if ([401].includes(response.status)) {
            logoutHandle();
          }
          let statusText = convertStatusCode(response.status);
          throw Error(statusText);
        } else {
          resolve(response.json());
        }
      })
      .catch((error) => reject(error));
  });
}

export { fetchAPIFile };
