import { takeEvery, put, select } from "redux-saga/effects";
import { notification } from "antd";
import {
  ADD_FLOOR_REQUEST,
  DELETE_FLOOR_REQUEST,
  GET_FLOOR_REQUEST,
  UPDATE_FLOOR_REQUEST,
  SEARCH_FLOOR_REQUEST,
  DELETE_MULTIPLE_FLOOR_REQUEST,
  GET_FLOOR_ENABLE_BY_BUILDING_ID_REQUEST,
  UPDATE_ENABLE_FLOOR_REQUEST,
} from "@Constants/actiontype/FloorActionType";
import {
  getFloorRequest,
  getFloorSuccess,
  getFloorFailure,
  addFloorFailure,
  addFLoorSuccess,
  deleteFloorFailure,
  deleteFloorSuccess,
  updateFloorSuccess,
  updateFloorFailure,
  updateEnableFloorSuccess,
  updateEnableFloorFailure,
  searchFloorRequest,
  searchFloorSuccess,
  searchFloorFailure,
  deleteMultipleFloorSuccess,
  deleteMultipleFloorFailure,
  getFloorEnableByBuildingIdSuccess,
  getFloorEnableByBuildingIdFailure,
} from "@Actions/FloorActions";
import { callAPI } from "@Services/HttpService";
import { fetchAPIFile } from "@Services/FileHttpService";
import {
  HTTP_CREATE,
  HTTP_DELETE,
  HTTP_READ,
  HTTP_UPDATE,
} from "@Constants/Http";
import { DESC_SORT, LIMIT } from "@Constants/common";

function* getFloorSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, `floor`, payload, {});
    yield put(
      getFloorSuccess({
        listFloor: res.data.response,
        totalItem: res.data.metadata.total,
        activePage: payload.page,
        textSearch: "",
      })
    );
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(getFloorFailure(error.message));
  }
}

function* getFloorEnableByBuildingIdSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, `floor/enabled/${payload}`);
    yield put(getFloorEnableByBuildingIdSuccess(res.data || []));
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(getFloorEnableByBuildingIdFailure(error.message));
  }
}

function* searchFloorSaga({ payload }) {
  try {
    const res = yield callAPI(HTTP_READ, `floor/search`, payload, {});
    yield put(
      searchFloorSuccess({
        listFloor: res.data.response,
        totalItem: res.data.metadata.total,
        activePage: payload.page,
        textSearch: payload.floorName,
      })
    );
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(searchFloorFailure(error.message));
  }
}

function* addFloorSaga({ payload }) {
  try {
    const formData = new FormData();
    formData.append("file", payload.file);
    const resUpload = yield fetchAPIFile(
      `upload`,
      { bucketName: "salt", fileType: "IMAGES" },
      formData
    );
    let floorData = Object.assign(
      {},
      { ...payload, backgroundFloor: resUpload.previewUrl }
    );
    delete floorData.address;
    delete floorData.file;
    yield callAPI(HTTP_CREATE, `floor`, {}, floorData);
    yield put(addFLoorSuccess());
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(addFloorFailure(error.message));
  }
}

function* updateFloorSaga({ payload }) {
  try {
    let floorUpdateData = payload;
    if (payload.file) {
      const formData = new FormData();
      formData.append("file", payload.file);
      const resUpload = yield fetchAPIFile(
        `upload`,
        { bucketName: "salt", fileType: "IMAGES" },
        formData
      );
      floorUpdateData = Object.assign(
        {},
        { ...payload, backgroundFloor: resUpload.previewUrl }
      );
    }
    yield callAPI(HTTP_UPDATE, `floor/${payload.id}`, {}, floorUpdateData);
    // const { textSearch, activePage } = yield select((state) => state.floor);
    yield put(updateFloorSuccess());
    // if (!textSearch) {
    //   yield put(getFloorRequest({ page: activePage, size: LIMIT }));
    // } else {
    //   yield put(
    //     searchFloorRequest({
    //       page: activePage,
    //       size: LIMIT,
    //       floorName: textSearch,
    //       sort: "id",
    //       sortType: DESC_SORT,
    //     })
    //   );
    // }
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(updateFloorFailure(error.message));
  }
}

function* updateEnableFloorSaga({ payload }) {
  try {
    yield callAPI(HTTP_UPDATE, `floor/enable/${payload.id}`, {}, payload);
    const { textSearch, activePage } = yield select((state) => state.floor);
    yield put(updateEnableFloorSuccess());
    if (!textSearch) {
      yield put(getFloorRequest({ page: activePage, size: LIMIT }));
    } else {
      yield put(
        searchFloorRequest({
          page: activePage,
          size: LIMIT,
          floorName: textSearch,
          sort: "id",
          sortType: DESC_SORT,
        })
      );
    }
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(updateEnableFloorFailure(error.message));
  }
}

function* deleteFloorSaga({ payload }) {
  try {
    yield callAPI(HTTP_DELETE, `floor/${payload}`);
    const { textSearch, activePage, totalItem } = yield select(
      (state) => state.floor
    );
    yield put(deleteFloorSuccess());
    if (!textSearch) {
      let page = (totalItem - 1) % LIMIT === 0 ? activePage - 1 : activePage;
      yield put(
        getFloorRequest({
          page: page <= 0 ? 1 : page,
          size: LIMIT,
          sort: "id",
          sortType: DESC_SORT,
        })
      );
    } else {
      yield put(
        getFloorRequest({
          page: 1,
          size: LIMIT,
          sort: "id",
          sortType: DESC_SORT,
        })
      );
    }
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(deleteFloorFailure(error.message));
  }
}

function* deleteMultipleFloorSaga({ payload }) {
  try {
    yield callAPI(HTTP_DELETE, `floor`, payload);
    const { textSearch, activePage, totalItem } = yield select(
      (state) => state.floor
    );
    yield put(deleteMultipleFloorSuccess());
    if (!textSearch) {
      let page = (totalItem - 1) % LIMIT === 0 ? activePage - 1 : activePage;
      yield put(
        getFloorRequest({
          page: page <= 0 ? 1 : page,
          size: LIMIT,
          sort: "id",
          sortType: DESC_SORT,
        })
      );
    } else {
      yield put(
        getFloorRequest({
          page: 1,
          size: LIMIT,
          sort: "id",
          sortType: DESC_SORT,
        })
      );
    }
  } catch (error) {
    yield notification.warning({
      message: "There's something wrong",
      description: error.message,
    });
    yield put(deleteMultipleFloorFailure(error.message));
  }
}

const floorSaga = [
  takeEvery(GET_FLOOR_REQUEST, getFloorSaga),
  takeEvery(SEARCH_FLOOR_REQUEST, searchFloorSaga),
  takeEvery(ADD_FLOOR_REQUEST, addFloorSaga),
  takeEvery(UPDATE_FLOOR_REQUEST, updateFloorSaga),
  takeEvery(DELETE_FLOOR_REQUEST, deleteFloorSaga),
  takeEvery(DELETE_MULTIPLE_FLOOR_REQUEST, deleteMultipleFloorSaga),
  takeEvery(
    GET_FLOOR_ENABLE_BY_BUILDING_ID_REQUEST,
    getFloorEnableByBuildingIdSaga
  ),
  takeEvery(UPDATE_ENABLE_FLOOR_REQUEST, updateEnableFloorSaga),
];

export default floorSaga;
