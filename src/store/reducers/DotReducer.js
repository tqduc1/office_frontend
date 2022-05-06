import {
  GET_DOT_MAP_REQUEST,
  GET_DOT_MAP_SUCCESS,
  GET_DOT_MAP_FAILURE,
  UPDATE_DOT_MAP_REQUEST,
  UPDATE_DOT_MAP_SUCCESS,
  UPDATE_DOT_MAP_FAILURE,
  GET_DOT_LIST_REQUEST,
  GET_DOT_LIST_SUCCESS,
  GET_DOT_LIST_FAILURE,
  DELETE_DOT_LIST_REQUEST,
  DELETE_DOT_LIST_SUCCESS,
  DELETE_DOT_LIST_FAILURE,
  UPDATE_DOT_LIST_REQUEST,
  UPDATE_DOT_LIST_SUCCESS,
  UPDATE_DOT_LIST_FAILURE,
  SEARCH_DOT_REQUEST,
  SEARCH_DOT_SUCCESS,
  SEARCH_DOT_FAILURE,
  SWAP_DOT_REQUEST,
  SWAP_DOT_SUCCESS,
  SWAP_DOT_FAILURE,
  ACTIVE_DOT_REQUEST,
  ACTIVE_DOT_SUCCESS,
  ACTIVE_DOT_FAILURE,
} from "@Constants/actiontype/DotActionType";
import { RESET_GROUP_DEPARTMENT } from "../../constants/actiontype/GroupDepartmentActionType";
const DEFAULT_STATE_DOT = {
  isLoading: false,
  err: null,
  listDot: [],
  listDotSearch: [],
  activePage: 1,
  totalItem: 1,
  paramGet: {},
};

const dotReducer = (state = DEFAULT_STATE_DOT, action) => {
  switch (action.type) {
    case GET_DOT_LIST_REQUEST:
    case UPDATE_DOT_MAP_REQUEST:
    case DELETE_DOT_LIST_REQUEST:
    case UPDATE_DOT_LIST_REQUEST:
    case SWAP_DOT_REQUEST:
    case ACTIVE_DOT_REQUEST:
      return {
        ...state,
        isLoading: true,
        err: null,
      };
    case SEARCH_DOT_REQUEST:
      return {
        ...state,
        isLoading: false,
        err: null,
      };

    case GET_DOT_MAP_REQUEST:
      return {
        ...state,
        isLoading: true,
        listDot: [],
        err: null,
      };
    case RESET_GROUP_DEPARTMENT:
      return {
        ...state,
        isLoading: false,
        listDot: [],
        err: null,
      };

    case GET_DOT_MAP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listDot: action.payload.listDot,
        paramGet: action.payload.paramGet,
      };
    case SEARCH_DOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listDotSearch: action.payload,
      };

    case GET_DOT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listDot: action.payload.listDot,
        activePage: action.payload.activePage,
        totalItem: action.payload.totalItem,
        paramGet: action.payload.paramGet,
      };

    case UPDATE_DOT_MAP_SUCCESS:
    case DELETE_DOT_LIST_SUCCESS:
    case SWAP_DOT_SUCCESS:
    case UPDATE_DOT_LIST_SUCCESS:
    case ACTIVE_DOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case GET_DOT_LIST_FAILURE:
    case GET_DOT_MAP_FAILURE:
    case UPDATE_DOT_MAP_FAILURE:
    case DELETE_DOT_LIST_FAILURE:
    case UPDATE_DOT_LIST_FAILURE:
    case SEARCH_DOT_FAILURE:
    case SWAP_DOT_FAILURE:
    case ACTIVE_DOT_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };

    default:
      return state;
  }
};

export default dotReducer;
