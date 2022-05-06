import {
  GET_GROUP_DEPARTMENT_REQUEST,
  GET_GROUP_DEPARTMENT_SUCCESS,
  GET_GROUP_DEPARTMENT_FAILURE,
  RESET_GROUP_DEPARTMENT,
} from "@Constants/actiontype/GroupDepartmentActionType";
const DEFAULT_STATE_GROUP_DEPARTMENT = {
  isLoadingGroup: false,
  err: null,
  listGroupDepartment: [],
};

const groupDepartmentReducer = (
  state = DEFAULT_STATE_GROUP_DEPARTMENT,
  action
) => {
  switch (action.type) {
    case GET_GROUP_DEPARTMENT_REQUEST:
      return {
        ...state,
        isLoadingGroup: true,
        err: null,
        listGroupDepartment: [],
      };
    case RESET_GROUP_DEPARTMENT:
      return {
        ...state,
        isLoadingGroup: false,
        err: null,
        listGroupDepartment: [],
      };

    case GET_GROUP_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isLoadingGroup: false,
        listGroupDepartment: action.payload,
      };

    case GET_GROUP_DEPARTMENT_FAILURE:
      return {
        ...state,
        isLoadingGroup: false,
        err: action.payload,
      };

    default:
      return state;
  }
};

export default groupDepartmentReducer;
