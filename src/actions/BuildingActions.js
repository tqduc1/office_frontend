import { createAction } from "redux-actions";
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

const searchBuildingRequest = createAction(SEARCH_BUILDING_REQUEST);
const searchBuildingSuccess = createAction(SEARCH_BUILDING_SUCCESS);
const searchBuildingFailure = createAction(SEARCH_BUILDING_FAILURE);

const getBuildingRequest = createAction(GET_BUILDING_REQUEST);
const getBuildingSuccess = createAction(GET_BUILDING_SUCCESS);
const getBuildingFailure = createAction(GET_BUILDING_FAILURE);

const getBuildingEnableRequest = createAction(GET_BUILDING_ENABLE_REQUEST);
const getBuildingEnableSuccess = createAction(GET_BUILDING_ENABLE_SUCCESS);
const getBuildingEnableFailure = createAction(GET_BUILDING_ENABLE_FAILURE);

const addBuildingRequest = createAction(ADD_BUILDING_REQUEST);
const addBuildingSuccess = createAction(ADD_BUILDING_SUCCESS);
const addBuildingFailure = createAction(ADD_BUILDING_FAILURE);

const updateBuildingRequest = createAction(UPDATE_BUILDING_REQUEST);
const updateBuildingSuccess = createAction(UPDATE_BUILDING_SUCCESS);
const updateBuildingFailure = createAction(UPDATE_BUILDING_FAILURE);

const deleteBuildingRequest = createAction(DELETE_BUILDING_REQUEST);
const deleteBuildingSuccess = createAction(DELETE_BUILDING_SUCCESS);
const deleteBuildingFailure = createAction(DELETE_BUILDING_FAILURE);

const deleteMultipleBuildingRequest = createAction(
  DELETE_MULTIPLE_BUILDING_REQUEST
);
const deleteMultipleBuildingSuccess = createAction(
  DELETE_MULTIPLE_BUILDING_SUCCESS
);
const deleteMultipleBuildingFailure = createAction(
  DELETE_MULTIPLE_BUILDING_FAILURE
);

export {
  searchBuildingRequest,
  searchBuildingSuccess,
  searchBuildingFailure,
  getBuildingRequest,
  getBuildingSuccess,
  getBuildingFailure,
  getBuildingEnableRequest,
  getBuildingEnableSuccess,
  getBuildingEnableFailure,
  addBuildingRequest,
  addBuildingSuccess,
  addBuildingFailure,
  updateBuildingRequest,
  updateBuildingSuccess,
  updateBuildingFailure,
  deleteBuildingRequest,
  deleteBuildingSuccess,
  deleteBuildingFailure,
  deleteMultipleBuildingRequest,
  deleteMultipleBuildingSuccess,
  deleteMultipleBuildingFailure,
};
