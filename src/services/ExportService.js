import FileSaver from "file-saver";
import moment from "moment";
import { getToken } from "../http";
import { getSessionStorage } from "../http/storage/sessionStorage";
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
    getSessionStorage(process.env.KEY_APP)?.name
  }&`;
  var Uri = "";
  if (params) {
    Object.keys(params).forEach((key) => {
      Uri += key + "=" + params[key] + "&";
    });
  }

  return url + Uri;
};
function exportAPI(subUri, queryParams = {}, fileName, isVerify = true) {
  let requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/octet-stream",
      "Content-Type": "application/octet-stream",
      ...authHeader(isVerify),
    },
  };
  return new Promise((resolve, reject) => {
    fetch(makeRequest(subUri, queryParams), requestOptions)
      .then((response) => {
        if (!response.ok) {
          if ([401].includes(response.status)) {
            logoutHandle();
          }
          throw Error("There was an error while export the file");
        } else {
          return response.blob();
        }
      })
      .then((data) => {
        FileSaver.saveAs(
          data,
          `${fileName}_${moment().format("DD-MM-YYYY_HH:mm:ss")}.xlsx`
        );
        resolve(data);
      })
      .catch((error) => reject(error));
  });
}

export { exportAPI };
