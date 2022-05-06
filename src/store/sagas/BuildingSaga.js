import { takeEvery, put, select } from "redux-saga/effects";
import { notification } from "antd";
import {
  ADD_BUILDING_REQUEST,
  DELETE_BUILDING_REQUEST,
  DELETE_MULTIPLE_BUILDING_REQUEST,
  GET_BUILDING_ENABLE_REQUEST,
  GET_BUILDING_REQUEST,
  SEARCH_BUILDING_REQUEST,
  UPDATE_BUILDING_REQUEST,
} from "@Constants/actiontype/BuildingActionType";
import {
  getBuildingRequest,
  getBuildingSuccess,
  getBuildingFailure,
  searchBuildingRequest,
  searchBuildingSuccess,
  searchBuildingFailure,
  updateBuildingSuccess,
  updateBuildingFailure,
  addBuildingSuccess,
  addBuildingFailure,
  deleteBuildingSuccess,
  deleteBuildingFailure,
  deleteMultipleBuildingSuccess,
  deleteMultipleBuildingFailure,
  getBuildingEnableSuccess,
  getBuildingEnableFailure,
} from "@Actions/BuildingActions";
import { callAPI } from "@Services/HttpService";

import {
  HTTP_CREATE,
  HTTP_DELETE,
  HTTP_READ,
  HTTP_UPDATE,
} from "@Constants/Http";
import { DESC_SORT, LIMIT } from "@Constants/common";
import { getFloorEnableByBuildingIdRequest } from "../../actions/FloorActions";

function* getBuildingSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, `building`, payload, {});
    yield put(
      getBuildingSuccess({
        listBuilding: res.data.responses,
        totalItem: res.data.metadata.total,
        activePage: payload.page,
        textSearch: "",
      })
    );
  } catch (error) {
    yield notification.warning({
      message: "Cant get building",
      description: error.message,
    });
    yield put(getBuildingFailure(error.message));
  }
}
function* getBuildingEnableSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, `building/enabled`, payload, {});
    yield put(getBuildingEnableSuccess(res.data || []));
    if (payload?.getfloor) {
      yield put(getFloorEnableByBuildingIdRequest(res.data?.[0]?.id));
    }
  } catch (error) {
    yield notification.warning({
      message: "Cant get building",
      description: error.message,
    });
    yield put(getBuildingEnableFailure(error.message));
  }
}

function* searchBuidingSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, `building/searching`, payload, {});
    yield put(
      searchBuildingSuccess({
        listBuilding: res.data.responses,
        totalItem: res.data.metadata.total,
        activePage: payload.page,
        textSearch: payload.buildingName,
      })
    );
  } catch (error) {
    yield notification.warning({
      message: "Cant search building",
      description: error.message,
    });
    yield put(searchBuildingFailure(error.message));
  }
}

function* updateBuidingSaga({ payload }) {
  try {
    yield callAPI(HTTP_UPDATE, `building/${payload.id}`, {}, payload);
    const { textSearch, activePage } = yield select((state) => state.building);
    yield put(updateBuildingSuccess());
    if (!textSearch) {
      yield put(
        getBuildingRequest({
          page: activePage,
          size: LIMIT,
          sort: "id",
          order: DESC_SORT,
        })
      );
    } else {
      yield put(
        searchBuildingRequest({
          page: activePage,
          size: LIMIT,
          buildingName: textSearch,
          sort: "id",
          order: DESC_SORT,
        })
      );
    }
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(updateBuildingFailure(error.message));
  }
}

function* addBuidingSaga({ payload }) {
  try {
    yield callAPI(HTTP_CREATE, `building`, {}, payload);
    yield put(addBuildingSuccess());
    yield put(
      getBuildingRequest({ page: 1, size: LIMIT, sort: "id", order: DESC_SORT })
    );
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(addBuildingFailure(error.message));
  }
}

function* deleteBuidingSaga({ payload }) {
  try {
    yield callAPI(HTTP_DELETE, `building/${payload}`);
    const { textSearch, activePage, totalItem } = yield select(
      (state) => state.building
    );
    yield put(deleteBuildingSuccess());
    if (!textSearch) {
      let page = (totalItem - 1) % LIMIT === 0 ? activePage - 1 : activePage;
      yield put(
        getBuildingRequest({
          page: page <= 0 ? 1 : page,
          size: LIMIT,
          sort: "id",
          order: DESC_SORT,
        })
      );
    } else {
      yield put(
        getBuildingRequest({
          page: 1,
          size: LIMIT,
          sort: "id",
          order: DESC_SORT,
        })
      );
    }
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(deleteBuildingFailure(error.message));
  }
}

function* deleteMultipleBuidingSaga({ payload }) {
  try {
    yield callAPI(HTTP_DELETE, `building`, payload);
    const { textSearch, activePage, totalItem } = yield select(
      (state) => state.building
    );
    yield put(deleteMultipleBuildingSuccess());
    if (!textSearch) {
      let page = (totalItem - 1) % LIMIT === 0 ? activePage - 1 : activePage;
      yield put(
        getBuildingRequest({
          page: page <= 0 ? 1 : page,
          size: LIMIT,
          sort: "id",
          order: DESC_SORT,
        })
      );
    } else {
      yield put(
        getBuildingRequest({
          page: 1,
          size: LIMIT,
          sort: "id",
          order: DESC_SORT,
        })
      );
    }
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(deleteMultipleBuildingFailure(error.message));
  }
}

const buildingSaga = [
  takeEvery(GET_BUILDING_REQUEST, getBuildingSaga),
  takeEvery(GET_BUILDING_ENABLE_REQUEST, getBuildingEnableSaga),
  takeEvery(SEARCH_BUILDING_REQUEST, searchBuidingSaga),
  takeEvery(UPDATE_BUILDING_REQUEST, updateBuidingSaga),
  takeEvery(ADD_BUILDING_REQUEST, addBuidingSaga),
  takeEvery(DELETE_BUILDING_REQUEST, deleteBuidingSaga),
  takeEvery(DELETE_MULTIPLE_BUILDING_REQUEST, deleteMultipleBuidingSaga),
];

export default buildingSaga;
