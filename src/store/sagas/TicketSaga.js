import { takeEvery, put, select } from "redux-saga/effects";
import { notification } from "antd";
import { callAPI } from "@Services/HttpService";
import { HTTP_READ, HTTP_CREATE } from "@Constants/Http";
import {
  getTicketSuccess,
  getTicketFailure,
  addTicketSuccess,
  addTicketFailure,
  updateTicketSuccess,
  updateTicketFailure,
  getTicketRequest,
  getTicketDetailSuccess,
  getTicketDetailFailure,
} from "../../actions/TicketActions";
import {
  ADD_TICKET_REQUEST,
  GET_TICKET_DETAIL_REQUEST,
  GET_TICKET_REQUEST,
  UPDATE_TICKET_REQUEST,
} from "../../constants/actiontype/TicketActionType";
import { HTTP_UPDATE } from "../../constants/Http";
import { getDotMapRequest } from "../../actions/DotAction";

function* getTicketSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, "ticket", payload);

    yield put(
      getTicketSuccess({
        listTicket: res.data.ticketResponses,
        paramGet: payload,
        activePage: payload.page,
        totalItem: res.data.metadata.total,
      })
    );
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(getTicketFailure(error.message));
  }
}

function* addTicketSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_CREATE, `ticket`, {}, payload);
    yield put(addTicketSuccess(res.message));
    const { paramGet } = yield select((state) => state.dot);
    yield put(getDotMapRequest(paramGet));
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(addTicketFailure(error.message));
  }
}

function* updateTicketSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_UPDATE, `ticket`, {}, payload);
    yield put(updateTicketSuccess(res.message));
    const { paramGet } = yield select((state) => state.ticket);
    yield put(getTicketRequest(paramGet));
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(updateTicketFailure(error.message));
  }
}

function* updateTicketDetailSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, `ticket/detail/${payload}`);
    yield put(getTicketDetailSuccess(res.data));
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(getTicketDetailFailure(error.message));
  }
}

const ticketSaga = [
  takeEvery(GET_TICKET_REQUEST, getTicketSaga),
  takeEvery(ADD_TICKET_REQUEST, addTicketSaga),
  takeEvery(UPDATE_TICKET_REQUEST, updateTicketSaga),
  takeEvery(GET_TICKET_DETAIL_REQUEST, updateTicketDetailSaga),
];

export default ticketSaga;
