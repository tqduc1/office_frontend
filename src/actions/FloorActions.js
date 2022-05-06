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
import { createAction } from "redux-actions";

const searchFloorRequest = createAction(SEARCH_FLOOR_REQUEST);
const searchFloorSuccess = createAction(SEARCH_FLOOR_SUCCESS);
const searchFloorFailure = createAction(SEARCH_FLOOR_FAILURE);

const getFloorRequest = createAction(GET_FLOOR_REQUEST);
const getFloorSuccess = createAction(GET_FLOOR_SUCCESS);
const getFloorFailure = createAction(GET_FLOOR_FAILURE);

const getFloorEnableByBuildingIdRequest = createAction(
  GET_FLOOR_ENABLE_BY_BUILDING_ID_REQUEST
);
const getFloorEnableByBuildingIdSuccess = createAction(
  GET_FLOOR_ENABLE_BY_BUILDING_ID_SUCCESS
);
const getFloorEnableByBuildingIdFailure = createAction(
  GET_FLOOR_ENABLE_BY_BUILDING_ID_FAILURE
);

const addFloorRequest = createAction(ADD_FLOOR_REQUEST);
const addFLoorSuccess = createAction(ADD_FLOOR_SUCCESS);
const addFloorFailure = createAction(ADD_FLOOR_FAILURE);

const updateFloorRequest = createAction(UPDATE_FLOOR_REQUEST);
const updateFloorSuccess = createAction(UPDATE_FLOOR_SUCCESS);
const updateFloorFailure = createAction(UPDATE_FLOOR_FAILURE);

const updateEnableFloorRequest = createAction(UPDATE_ENABLE_FLOOR_REQUEST);
const updateEnableFloorSuccess = createAction(UPDATE_ENABLE_FLOOR_SUCCESS);
const updateEnableFloorFailure = createAction(UPDATE_ENABLE_FLOOR_FAILURE);

const deleteFloorRequest = createAction(DELETE_FLOOR_REQUEST);
const deleteFloorSuccess = createAction(DELETE_FLOOR_SUCCESS);
const deleteFloorFailure = createAction(DELETE_FLOOR_FAILURE);

const deleteMultipleFloorSuccess = createAction(DELETE_MULTIPLE_FLOOR_SUCCESS);
const deleteMultipleFloorRequest = createAction(DELETE_MULTIPLE_FLOOR_REQUEST);
const deleteMultipleFloorFailure = createAction(DELETE_MULTIPLE_FLOOR_FAILURE);

export {
  searchFloorRequest,
  searchFloorSuccess,
  searchFloorFailure,
  getFloorRequest,
  getFloorSuccess,
  getFloorFailure,
  addFloorRequest,
  addFLoorSuccess,
  addFloorFailure,
  updateFloorRequest,
  updateFloorSuccess,
  updateFloorFailure,
  updateEnableFloorRequest,
  updateEnableFloorSuccess,
  updateEnableFloorFailure,
  deleteFloorRequest,
  deleteFloorSuccess,
  deleteFloorFailure,
  deleteMultipleFloorSuccess,
  deleteMultipleFloorRequest,
  deleteMultipleFloorFailure,
  getFloorEnableByBuildingIdRequest,
  getFloorEnableByBuildingIdSuccess,
  getFloorEnableByBuildingIdFailure,
};
