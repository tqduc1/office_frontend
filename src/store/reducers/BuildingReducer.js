import {
  SEARCH_BUILDING_REQUEST,
  SEARCH_BUILDING_SUCCESS,
  SEARCH_BUILDING_FAILURE,
  GET_BUILDING_REQUEST,
  GET_BUILDING_SUCCESS,
  GET_BUILDING_FAILURE,
  GET_BUILDING_ENABLE_REQUEST,
  GET_BUILDING_ENABLE_SUCCESS,
  GET_BUILDING_ENABLE_FAILURE,
  ADD_BUILDING_REQUEST,
  ADD_BUILDING_SUCCESS,
  ADD_BUILDING_FAILURE,
  UPDATE_BUILDING_REQUEST,
  UPDATE_BUILDING_SUCCESS,
  UPDATE_BUILDING_FAILURE,
  DELETE_BUILDING_REQUEST,
  DELETE_BUILDING_SUCCESS,
  DELETE_BUILDING_FAILURE,
  DELETE_MULTIPLE_BUILDING_REQUEST,
  DELETE_MULTIPLE_BUILDING_SUCCESS,
  DELETE_MULTIPLE_BUILDING_FAILURE,
} from "@Constants/actiontype/BuildingActionType";
import { RESET_GROUP_DEPARTMENT } from "../../constants/actiontype/GroupDepartmentActionType";
const DEFAULT_STATE_BUILDING = {
  isLoading: false,
  err: null,
  listBuilding: [],
  listBuildingEnable: [],
  totalItem: 1,
  activePage: 1,
  textSearch: "",
};

const buildingReducer = (state = DEFAULT_STATE_BUILDING, action) => {
  switch (action.type) {
    case SEARCH_BUILDING_REQUEST:
    case GET_BUILDING_REQUEST:
    case ADD_BUILDING_REQUEST:
    case UPDATE_BUILDING_REQUEST:
    case DELETE_BUILDING_REQUEST:
    case DELETE_MULTIPLE_BUILDING_REQUEST:
    case GET_BUILDING_ENABLE_REQUEST:
      return {
        ...state,
        isLoading: true,
        err: null,
      };

    case RESET_GROUP_DEPARTMENT:
      return {
        ...state,
        isLoading: false,
        err: null,
        listBuildingEnable: [],
      };

    case SEARCH_BUILDING_SUCCESS:
    case GET_BUILDING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listBuilding: action.payload.listBuilding,
        activePage: action.payload.activePage,
        totalItem: action.payload.totalItem,
        textSearch: action.payload.textSearch,
      };
    case GET_BUILDING_ENABLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listBuildingEnable: action.payload,
      };

    case ADD_BUILDING_SUCCESS:
    case UPDATE_BUILDING_SUCCESS:
    case DELETE_BUILDING_SUCCESS:
    case DELETE_MULTIPLE_BUILDING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case SEARCH_BUILDING_FAILURE:
    case GET_BUILDING_FAILURE:
    case ADD_BUILDING_FAILURE:
    case UPDATE_BUILDING_FAILURE:
    case DELETE_BUILDING_FAILURE:
    case DELETE_MULTIPLE_BUILDING_FAILURE:
    case GET_BUILDING_ENABLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };

    default:
      return state;
  }
};

export default buildingReducer;
