import { takeEvery, put, select } from "redux-saga/effects";
import { notification } from "antd";
import { callAPI } from "@Services/HttpService";
import {
  GET_DOT_LIST_REQUEST,
  GET_DOT_MAP_REQUEST,
} from "@Constants/actiontype/DotActionType";
import { HTTP_READ } from "@Constants/Http";
import {
  getDotListFailure,
  getDotListSuccess,
  getDotMapFailure,
  getDotMapSuccess,
} from "@Actions/DotAction";
import {
  ACTIVE_DOT_REQUEST,
  DELETE_DOT_LIST_REQUEST,
  SEARCH_DOT_REQUEST,
  SWAP_DOT_REQUEST,
  UPDATE_DOT_LIST_REQUEST,
  UPDATE_DOT_MAP_REQUEST,
} from "../../constants/actiontype/DotActionType";
import {
  activeDotFailure,
  activeDotSuccess,
  deleteDotListFailure,
  deleteDotListSuccess,
  getDotListRequest,
  getDotMapRequest,
  searchDotFailure,
  searchDotSuccess,
  swapDotFailure,
  swapDotSuccess,
  updateDotListFailure,
  updateDotListSuccess,
  updateDotMapFailure,
  updateDotMapSuccess,
} from "../../actions/DotAction";
import { HTTP_DELETE, HTTP_UPDATE } from "../../constants/Http";

function* getDotMapSaga({ payload }) {
  console.log(payload);
  try {
    const res = yield callAPI(
      HTTP_READ,
      `dot/map/${payload.typeSelect}`,
      payload
    );
    yield put(getDotMapSuccess({ listDot: res.data, paramGet: payload }));
  } catch (error) {
    yield notification.warning({
      message: "Cant get dot",
      description: error.message,
    });
    yield put(getDotMapFailure(error.message));
  }
}

function* getDotListSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, "dot/list", payload);
    yield put(
      getDotListSuccess({
        listDot: res.data.dotResponses,
        activePage: payload.page,
        totalItem: res.data.metadata.total,
        paramGet: payload,
      })
    );
  } catch (error) {
    yield notification.warning({
      message: "Cant get dot",
      description: error.message,
    });
    yield put(getDotListFailure(error.message));
  }
}

function* updateDotMapSaga({ payload }) {
  try {
    let dotData = Object.assign({}, { ...payload });
    delete dotData.screen;
    yield callAPI(HTTP_UPDATE, "dot/list/user-status", {}, dotData);
    const { paramGet } = yield select((state) => state.dot);
    yield put(updateDotMapSuccess());
    if (payload.screen === "map") {
      yield put(getDotMapRequest(paramGet));
    } else {
      yield put(getDotListRequest(paramGet));
    }
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(updateDotMapFailure(error.message));
  }
}

function* deleteDotListSaga({ payload }) {
  try {
    yield callAPI(HTTP_DELETE, `dot/list/${payload}`);
    const { paramGet } = yield select((state) => state.dot);
    yield put(deleteDotListSuccess());
    yield put(getDotListRequest(paramGet));
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(deleteDotListFailure(error.message));
  }
}

function* updateDotListSaga({ payload }) {
  try {
    let dotData = Object.assign({}, { ...payload });
    delete dotData.screen;
    delete dotData.fromDate;
    delete dotData.toDate;
    delete dotData.status;
    yield callAPI(HTTP_UPDATE, "dot/list/status-date-range", {}, dotData);
    const { paramGet } = yield select((state) => state.dot);
    yield put(updateDotListSuccess());
    if (payload.screen === "map") {
      yield put(getDotMapRequest(paramGet));
    } else {
      yield put(getDotListRequest(paramGet));
    }
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(updateDotListFailure(error.message));
  }
}

function* searchDotSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, `dot/list/${payload.query}`, {
      date: payload.date,
    });
    yield put(searchDotSuccess(res.data));
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(searchDotFailure(error.message));
  }
}

function* swapDotSaga({ payload }) {
  try {
    yield callAPI(
      HTTP_UPDATE,
      `dot/list/${payload.idDot}/swap/${payload.idDotSwap}`
    );
    const { paramGet } = yield select((state) => state.dot);
    yield put(swapDotSuccess());
    yield put(getDotListRequest(paramGet));
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(swapDotFailure(error.message));
  }
}

function* activeDotSaga({ payload }) {
  try {
    yield callAPI(HTTP_UPDATE, `dot/list/enable-switch/${payload}`);
    const { paramGet } = yield select((state) => state.dot);
    yield put(activeDotSuccess());
    yield put(getDotListRequest(paramGet));
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(activeDotFailure(error.message));
  }
}

const dotSaga = [
  takeEvery(GET_DOT_MAP_REQUEST, getDotMapSaga),
  takeEvery(GET_DOT_LIST_REQUEST, getDotListSaga),
  takeEvery(UPDATE_DOT_MAP_REQUEST, updateDotMapSaga),
  takeEvery(DELETE_DOT_LIST_REQUEST, deleteDotListSaga),
  takeEvery(UPDATE_DOT_LIST_REQUEST, updateDotListSaga),
  takeEvery(SEARCH_DOT_REQUEST, searchDotSaga),
  takeEvery(SWAP_DOT_REQUEST, swapDotSaga),
  takeEvery(ACTIVE_DOT_REQUEST, activeDotSaga),
];

export default dotSaga;
