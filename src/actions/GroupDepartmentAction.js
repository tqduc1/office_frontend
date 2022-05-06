import {
  GET_GROUP_DEPARTMENT_REQUEST,
  GET_GROUP_DEPARTMENT_SUCCESS,
  GET_GROUP_DEPARTMENT_FAILURE,
  RESET_GROUP_DEPARTMENT,
} from "@Constants/actiontype/GroupDepartmentActionType";
import { createAction } from "redux-actions";

const getGroupDepartmentRequest = createAction(GET_GROUP_DEPARTMENT_REQUEST);
const getGroupDepartmentSuccess = createAction(GET_GROUP_DEPARTMENT_SUCCESS);
const getGroupDepartmentFailure = createAction(GET_GROUP_DEPARTMENT_FAILURE);

const resetGroupDepartment = createAction(RESET_GROUP_DEPARTMENT);

export {
  getGroupDepartmentRequest,
  getGroupDepartmentSuccess,
  getGroupDepartmentFailure,
  resetGroupDepartment,
};
