import {
  GET_DOT_REPORT_REQUEST,
  GET_DOT_REPORT_SUCCESS,
  GET_DOT_REPORT_FAILURE,
  EXPORT_DOT_REQUEST,
  EXPORT_DOT_SUCCESS,
  EXPORT_DOT_FAILURE,
} from "@Constants/actiontype/DotActionType";
const DEFAULT_STATE_REPORT = {
  isLoading: false,
  downloading: false,
  err: null,
  listData: [],
  activePage: 1,
  totalItem: 1,
  paramGet: {},
};

const reportReducer = (state = DEFAULT_STATE_REPORT, action) => {
  switch (action.type) {
    case GET_DOT_REPORT_REQUEST:
      return {
        ...state,
        isLoading: true,
        err: null,
      };
    case EXPORT_DOT_REQUEST:
      return {
        ...state,
        isLoading: false,
        downloading: true,
        err: null,
      };

    case GET_DOT_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listData: action.payload.listData,
        activePage: action.payload.activePage,
        totalItem: action.payload.totalItem,
        paramGet: action.payload.paramGet,
      };

    case EXPORT_DOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        downloading: false,
      };

    case GET_DOT_REPORT_FAILURE:
    case EXPORT_DOT_FAILURE:
      return {
        ...state,
        isLoading: false,
        downloading: false,
        err: action.payload,
      };

    default:
      return state;
  }
};

export default reportReducer;
