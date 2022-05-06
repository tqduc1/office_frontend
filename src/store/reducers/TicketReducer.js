import {
  GET_TICKET_REQUEST,
  GET_TICKET_SUCCESS,
  GET_TICKET_FAILURE,
  ADD_TICKET_REQUEST,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAILURE,
  UPDATE_TICKET_REQUEST,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAILURE,
  ClOSE_MESSAGE_SUCCESS,
  GET_TICKET_DETAIL_REQUEST,
  GET_TICKET_DETAIL_SUCCESS,
  GET_TICKET_DETAIL_FAILURE,
} from "@Constants/actiontype/TicketActionType";
import { GET_DOT_MAP_REQUEST } from "@Constants/actiontype/DotActionType";
const DEFAULT_STATE_TICKET = {
  isLoading: false,
  err: null,
  listTicket: [],
  activePage: 1,
  totalItem: 1,
  paramGet: {},
  ticketDetail: {},
  isSuccess: false,
  messageSuccess: null,
};

const ticketReducer = (state = DEFAULT_STATE_TICKET, action) => {
  switch (action.type) {
    case GET_TICKET_REQUEST:
    case ADD_TICKET_REQUEST:
    case UPDATE_TICKET_REQUEST:
    case GET_TICKET_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        messageSuccess: null,
        ticketDetail: {},
        err: null,
      };

    case GET_DOT_MAP_REQUEST:
    case ClOSE_MESSAGE_SUCCESS:
      return {
        ...state,
        isSuccess: false,
      };
    case GET_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listTicket: action.payload.listTicket,
        paramGet: action.payload.paramGet,
        activePage: action.payload.activePage,
        totalItem: action.payload.totalItem,
      };
    case GET_TICKET_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ticketDetail: action.payload,
      };
    case ADD_TICKET_SUCCESS:
    case UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        messageSuccess: action.payload,
      };

    case GET_TICKET_FAILURE:
    case ADD_TICKET_FAILURE:
    case UPDATE_TICKET_FAILURE:
    case GET_TICKET_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        messageSuccess: null,
        err: action.payload,
      };

    default:
      return state;
  }
};

export default ticketReducer;
