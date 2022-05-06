import { takeEvery, put, select } from "redux-saga/effects";
import { notification } from "antd";
import { callAPI } from "@Services/HttpService";
import { HTTP_READ } from "@Constants/Http";
import {
  EXPORT_DOT_REQUEST,
  GET_DOT_REPORT_REQUEST,
} from "../../constants/actiontype/DotActionType";

import {
  exportDotFailure,
  exportDotSuccess,
  getDotReportFailure,
  getDotReportSuccess,
} from "../../actions/DotAction";
import { exportAPI } from "../../services/ExportService";

function* getReportDotReportSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, "report", payload);
    yield put(
      getDotReportSuccess({
        listData: res.data.reportResponses,
        activePage: payload.page,
        totalItem: res.data.metadata.total,
        paramGet: payload,
      })
    );
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(getDotReportFailure(error.message));
  }
}
function* exportReportDotSaga({ payload }) {
  try {
    yield exportAPI("report/dot/export", payload, `Dot-Management`);
    yield put(exportDotSuccess());
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(exportDotFailure(error.message));
  }
}

const reportSaga = [
  takeEvery(GET_DOT_REPORT_REQUEST, getReportDotReportSaga),
  takeEvery(EXPORT_DOT_REQUEST, exportReportDotSaga),
];

export default reportSaga;
