import { HTTP_READ } from "../constants/Http";
import { convertStatusCode, logoutHandle } from "./common";

function callPOA(subUri, tokenRequire = false) {
  return new Promise((resolve, reject) => {
    var url = `${process.env.API_GROUP}/${subUri}`;
    const requestOptions = tokenRequire
      ? {
          method: HTTP_READ,
          headers: { Authorization: `Bearer ${process.env.TOKEN_POA_OFFICE}` },
        }
      : { method: HTTP_READ };
    fetch(url, requestOptions)
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
export { callPOA };
