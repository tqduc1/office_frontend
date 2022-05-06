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
} from "../constants/actiontype/TicketActionType";
import { createAction } from "redux-actions";

export const getTicketRequest = createAction(GET_TICKET_REQUEST);
export const getTicketSuccess = createAction(GET_TICKET_SUCCESS);
export const getTicketFailure = createAction(GET_TICKET_FAILURE);

export const addTicketRequest = createAction(ADD_TICKET_REQUEST);
export const addTicketSuccess = createAction(ADD_TICKET_SUCCESS);
export const addTicketFailure = createAction(ADD_TICKET_FAILURE);

export const updateTicketRequest = createAction(UPDATE_TICKET_REQUEST);
export const updateTicketSuccess = createAction(UPDATE_TICKET_SUCCESS);
export const updateTicketFailure = createAction(UPDATE_TICKET_FAILURE);

export const closeMessageSuccess = createAction(ClOSE_MESSAGE_SUCCESS);

export const getTicketDetailRequest = createAction(GET_TICKET_DETAIL_REQUEST);
export const getTicketDetailSuccess = createAction(GET_TICKET_DETAIL_SUCCESS);
export const getTicketDetailFailure = createAction(GET_TICKET_DETAIL_FAILURE);
