import { checkPermission } from "../services/common";

export const LIMIT = 25;
export const LIMIT_TICKET = 15;

export const NAV_HEIGHT = 55;
export const PADDING_TOP_SCREEN = 20;

export const DESC_SORT = "desc";
export const ASC_SORT = "asc";

export const DOT_FILTER = [
  {
    title: "Available",
    value: "available",
    key: "seat-available",
  },
  {
    title: "Booked",
    value: "booked",
    key: "seat-booked",
  },
  {
    title: "Allocated",
    value: "allocated",
    key: "seat-allocated",
  },
  {
    title: "Occupied",
    value: "occupied",
    key: "seat-occupied",
  },
];

export const STATUS_DOT = [
  {
    title: "Available",
    value: "available",
    key: "seat-available",
  },
  {
    title: "Book",
    value: "booked",
    key: "seat-booked",
  },
];

export const TYPE_SELECT = (activities) => {
  return [
    checkPermission(activities, "create-ticket-book") && {
      title: "Book",
      value: "book",
      key: "select-book",
    },
    checkPermission(activities, "create-ticket-extend") && {
      title: "Extend",
      value: "extend",
      key: "select-extend",
    },
    checkPermission(activities, "reclaim-ticket") && {
      title: "Reclaim",
      value: "reclaim",
      key: "select-reclaim",
    },
  ].filter(Boolean);
};

export const TICKET_FILTER = [
  {
    title: "Pending",
    value: "pending",
    key: "ticket-pending",
  },
  {
    title: "Approve",
    value: "approve",
    key: "ticket-approve",
  },
  {
    title: "Reject",
    value: "reject",
    key: "ticket-reject",
  },
];

export const DOT_ROOM_FILTER = [
  {
    title: "Available",
    value: "available",
    key: "room-available",
  },
  {
    title: "Booked",
    value: "booked",
    key: "room-booked",
  },
];

export const SCREEN = {
  office: "office",
  setting: "setting",
  report: "report",
  ticket: "ticket",
};

export const ID_IMAGE_MAP = "officeMap";

export const PERMISSION_ADMIN = "OFFICE-ADMIN";

export const PERMISSION_DULEAD = "OFFICE-DULEAD";

export const PERMISSION_MEMBER = "OFFICE-MEMBER";
