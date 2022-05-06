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
  GET_DOT_REPORT_REQUEST,
  GET_DOT_REPORT_SUCCESS,
  GET_DOT_REPORT_FAILURE,
  EXPORT_DOT_REQUEST,
  EXPORT_DOT_SUCCESS,
  EXPORT_DOT_FAILURE,
} from "@Constants/actiontype/DotActionType";
import { createAction } from "redux-actions";

export const getDotMapRequest = createAction(GET_DOT_MAP_REQUEST);
export const getDotMapSuccess = createAction(GET_DOT_MAP_SUCCESS);
export const getDotMapFailure = createAction(GET_DOT_MAP_FAILURE);

export const updateDotMapRequest = createAction(UPDATE_DOT_MAP_REQUEST);
export const updateDotMapSuccess = createAction(UPDATE_DOT_MAP_SUCCESS);
export const updateDotMapFailure = createAction(UPDATE_DOT_MAP_FAILURE);

export const getDotListRequest = createAction(GET_DOT_LIST_REQUEST);
export const getDotListSuccess = createAction(GET_DOT_LIST_SUCCESS);
export const getDotListFailure = createAction(GET_DOT_LIST_FAILURE);

export const deleteDotListRequest = createAction(DELETE_DOT_LIST_REQUEST);
export const deleteDotListSuccess = createAction(DELETE_DOT_LIST_SUCCESS);
export const deleteDotListFailure = createAction(DELETE_DOT_LIST_FAILURE);

export const updateDotListRequest = createAction(UPDATE_DOT_LIST_REQUEST);
export const updateDotListSuccess = createAction(UPDATE_DOT_LIST_SUCCESS);
export const updateDotListFailure = createAction(UPDATE_DOT_LIST_FAILURE);

export const searchDotRequest = createAction(SEARCH_DOT_REQUEST);
export const searchDotSuccess = createAction(SEARCH_DOT_SUCCESS);
export const searchDotFailure = createAction(SEARCH_DOT_FAILURE);

export const swapDotRequest = createAction(SWAP_DOT_REQUEST);
export const swapDotSuccess = createAction(SWAP_DOT_SUCCESS);
export const swapDotFailure = createAction(SWAP_DOT_FAILURE);

export const activeDotRequest = createAction(ACTIVE_DOT_REQUEST);
export const activeDotSuccess = createAction(ACTIVE_DOT_SUCCESS);
export const activeDotFailure = createAction(ACTIVE_DOT_FAILURE);

export const getDotReportRequest = createAction(GET_DOT_REPORT_REQUEST);
export const getDotReportSuccess = createAction(GET_DOT_REPORT_SUCCESS);
export const getDotReportFailure = createAction(GET_DOT_REPORT_FAILURE);

export const exportDotRequest = createAction(EXPORT_DOT_REQUEST);
export const exportDotSuccess = createAction(EXPORT_DOT_SUCCESS);
export const exportDotFailure = createAction(EXPORT_DOT_FAILURE);
