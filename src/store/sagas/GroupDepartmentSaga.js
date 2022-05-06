import { takeEvery, put } from "redux-saga/effects";
import { notification } from "antd";
import { callPOA } from "@Services/POAHttpService";
import { GET_GROUP_DEPARTMENT_REQUEST } from "@Constants/actiontype/GroupDepartmentActionType";
import cacheStore from "@Http/storage/cacheStore";
import {
  getGroupDepartmentFailure,
  getGroupDepartmentSuccess,
} from "@Actions/GroupDepartmentAction";

function* getGroupDepartmentSaga() {
  try {
    let groupDepartment = [];
    if (cacheStore.get("group-department")) {
      groupDepartment = cacheStore.get("group-department");
    } else {
      groupDepartment = yield callPOA("group/listDepartment");
      cacheStore.remember("group-department", groupDepartment);
    }
    yield put(getGroupDepartmentSuccess(groupDepartment));
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(getGroupDepartmentFailure(error.message));
  }
}

const groupDepartmentSaga = [
  takeEvery(GET_GROUP_DEPARTMENT_REQUEST, getGroupDepartmentSaga),
];

export default groupDepartmentSaga;
