import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBuildingEnableRequest } from "../../actions/BuildingActions";
import { getFloorEnableByBuildingIdRequest } from "../../actions/FloorActions";
import {
  getGroupDepartmentRequest,
  resetGroupDepartment,
} from "../../actions/GroupDepartmentAction";
import {
  getTicketDetailRequest,
  getTicketRequest,
  updateTicketRequest,
} from "../../actions/TicketActions";
import Loading from "../../components/common/Loading";
import TicketList from "../../components/ticket/TicketList";
import { LIMIT_TICKET, TICKET_FILTER } from "../../constants/common";
import { getStorage } from "../../http";
import { isMember, isDuLead } from "../../services/common";
export default function Ticket({ permission }) {
  const dispatch = useDispatch();

  const getTicketDispatch = useCallback(
    (param) => dispatch(getTicketRequest(param)),
    []
  );

  const getTicketDetailDispatch = useCallback(
    (param) => dispatch(getTicketDetailRequest(param)),
    []
  );

  const updateTicketDispatch = useCallback(
    (param) => dispatch(updateTicketRequest(param)),
    []
  );

  const getGroupDepartmentDispatch = useCallback(
    (param) => dispatch(getGroupDepartmentRequest(param)),
    []
  );
  const resetGroupDepartmentDispatch = useCallback(
    (param) => dispatch(resetGroupDepartment(param)),
    []
  );

  const getBuildingDispatch = useCallback(
    (param) => dispatch(getBuildingEnableRequest(param)),
    []
  );

  const getFloorEnableByBuildingIdDispatch = useCallback(
    (param) => dispatch(getFloorEnableByBuildingIdRequest(param)),
    []
  );
  useEffect(() => {
    getTicketDispatch({
      floorIds: [],
      department: isDuLead() ? getStorage("department") : "",
      username: isMember() ? getStorage("user")?.userName : "",
      status: [TICKET_FILTER[0].value],
      date: "",
      page: 1,
      size: LIMIT_TICKET,
    });
    getBuildingDispatch();
    getGroupDepartmentDispatch();
    return () => {
      resetGroupDepartmentDispatch();
    };
  }, []);
  const ticketStore = useSelector((state) => state.ticket);
  const { isLoadingGroup, listGroupDepartment } = useSelector(
    (state) => state.groupDepartment
  );
  const buildingStore = useSelector((state) => state.building);
  const floorStore = useSelector((state) => state.floor);
  return (
    <>
      <Loading
        loading={
          ticketStore.isLoading || isLoadingGroup || buildingStore.isLoading
        }
      />
      <TicketList
        getTicketDispatch={getTicketDispatch}
        getTicketDetailDispatch={getTicketDetailDispatch}
        updateTicketDispatch={updateTicketDispatch}
        getFloorEnableByBuildingIdDispatch={getFloorEnableByBuildingIdDispatch}
        listBuildingEnable={buildingStore.listBuildingEnable}
        listFloorEnable={floorStore.listFloorEnable}
        listGroupDepartment={listGroupDepartment}
        ticketStore={ticketStore}
        activities={
          permission?.filter((ele) => ele.key === `ticket`)?.[0]?.activities ||
          []
        }
      />
    </>
  );
}
