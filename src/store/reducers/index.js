import { combineReducers } from "redux";
import buildingReducer from "./BuildingReducer";
import dotReducer from "./DotReducer";
import floorReducer from "./FloorReducer";
import groupDepartmentReducer from "./GroupDepartmentReducer";
import languageReducer from "./LanguageReducer";
import reportReducer from "./ReportReducer";
import ticketReducer from "./TicketReducer";

const rootReducer = combineReducers({
  langReducer: languageReducer,
  building: buildingReducer,
  floor: floorReducer,
  groupDepartment: groupDepartmentReducer,
  dot: dotReducer,
  ticket: ticketReducer,
  report: reportReducer,
});

export default rootReducer;
