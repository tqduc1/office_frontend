import {
  SEARCH_FLOOR_REQUEST,
  SEARCH_FLOOR_SUCCESS,
  SEARCH_FLOOR_FAILURE,
  GET_FLOOR_REQUEST,
  GET_FLOOR_SUCCESS,
  GET_FLOOR_FAILURE,
  ADD_FLOOR_REQUEST,
  ADD_FLOOR_SUCCESS,
  ADD_FLOOR_FAILURE,
  UPDATE_FLOOR_REQUEST,
  UPDATE_FLOOR_SUCCESS,
  UPDATE_FLOOR_FAILURE,
  UPDATE_ENABLE_FLOOR_REQUEST,
  UPDATE_ENABLE_FLOOR_SUCCESS,
  UPDATE_ENABLE_FLOOR_FAILURE,
  DELETE_FLOOR_REQUEST,
  DELETE_FLOOR_SUCCESS,
  DELETE_FLOOR_FAILURE,
  DELETE_MULTIPLE_FLOOR_REQUEST,
  DELETE_MULTIPLE_FLOOR_SUCCESS,
  DELETE_MULTIPLE_FLOOR_FAILURE,
  GET_FLOOR_ENABLE_BY_BUILDING_ID_REQUEST,
  GET_FLOOR_ENABLE_BY_BUILDING_ID_SUCCESS,
  GET_FLOOR_ENABLE_BY_BUILDING_ID_FAILURE,
} from "@Constants/actiontype/FloorActionType";
import { RESET_GROUP_DEPARTMENT } from "../../constants/actiontype/GroupDepartmentActionType";
const DEFAULT_STATE_FLOOR = {
  isLoading: false,
  isSuccessful: false,
  err: null,
  listFloor: [],
  listFloorEnable: [],
  totalItem: 1,
  activePage: 1,
  textSearch: "",
};

const floorReducer = (state = DEFAULT_STATE_FLOOR, action) => {
  switch (action.type) {
    case GET_FLOOR_REQUEST:
    case ADD_FLOOR_REQUEST:
    case UPDATE_FLOOR_REQUEST:
    case UPDATE_ENABLE_FLOOR_REQUEST:
    case DELETE_FLOOR_REQUEST:
    case SEARCH_FLOOR_REQUEST:
    case DELETE_MULTIPLE_FLOOR_REQUEST:
    case GET_FLOOR_ENABLE_BY_BUILDING_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccessful: false,
        err: null,
      };

    case RESET_GROUP_DEPARTMENT:
      return {
        ...state,
        isLoading: false,
        err: null,
        listFloorEnable: [],
      };

    case GET_FLOOR_SUCCESS:
    case SEARCH_FLOOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listFloor: action.payload.listFloor,
        activePage: action.payload.activePage,
        totalItem: action.payload.totalItem,
        textSearch: action.payload.textSearch,
      };
    case GET_FLOOR_ENABLE_BY_BUILDING_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listFloorEnable: action.payload,
      };

    case ADD_FLOOR_SUCCESS:
    case UPDATE_FLOOR_SUCCESS:
    case DELETE_FLOOR_SUCCESS:
    case DELETE_MULTIPLE_FLOOR_SUCCESS:
    case UPDATE_ENABLE_FLOOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
      };

    case GET_FLOOR_FAILURE:
    case ADD_FLOOR_FAILURE:
    case UPDATE_FLOOR_FAILURE:
    case DELETE_FLOOR_FAILURE:
    case SEARCH_FLOOR_FAILURE:
    case DELETE_MULTIPLE_FLOOR_FAILURE:
    case GET_FLOOR_ENABLE_BY_BUILDING_ID_FAILURE:
    case UPDATE_ENABLE_FLOOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccessful: false,
        err: action.payload,
      };

    default:
      return state;
  }
};

export default floorReducer;
