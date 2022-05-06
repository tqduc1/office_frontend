import { all } from "redux-saga/effects";
import buildingSaga from "./BuildingSaga";
import groupDepartmentSaga from "./GroupDepartmentSaga";
import floorSaga from "./FloorSaga";
import dotSaga from "./DotSaga";
import ticketSaga from "./TicketSaga";
import reportSaga from "./ReportSaga";

function* rootSaga() {
  yield all([
    ...buildingSaga,
    ...floorSaga,
    ...groupDepartmentSaga,
    ...dotSaga,
    ...ticketSaga,
    ...reportSaga,
  ]);
}

export default rootSaga;
