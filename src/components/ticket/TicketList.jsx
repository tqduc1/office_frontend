import { Divider } from "antd";
import React, { memo, useCallback, useState } from "react";
import FilterList from "../common/FilterList";
import GroupActionButton from "./GroupActionButton";
import TableTicket from "./TableTicket/TableTicket";

function TicketList({
  getTicketDispatch,
  getTicketDetailDispatch,
  updateTicketDispatch,
  getFloorEnableByBuildingIdDispatch,
  listBuildingEnable,
  listFloorEnable,
  listGroupDepartment,
  ticketStore,
  activities,
}) {
  const [ticketSelected, setTicketSelected] = useState([]);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const { listTicket, activePage, totalItem, paramGet, ticketDetail } =
    ticketStore;
  const setCheckedAllTicketHandle = useCallback((value) => {
    setCheckedAll(value);
  }, []);
  const setIndeterminateTicketHandle = useCallback((value) => {
    setIndeterminate(value);
  }, []);

  return (
    <div className="ticket-container">
      <GroupActionButton
        onUpdateTicket={updateTicketDispatch}
        ticketSelected={ticketSelected}
        activities={activities}
        setCheckedAll={setCheckedAllTicketHandle}
        setIndeterminate={setIndeterminateTicketHandle}
      />
      <FilterList
        onSubmit={getTicketDispatch}
        getFloorEnableByBuildingIdDispatch={getFloorEnableByBuildingIdDispatch}
        listBuildingEnable={listBuildingEnable}
        listFloorEnable={listFloorEnable}
        listGroupDepartment={listGroupDepartment}
        screen={"ticket"}
      />
      <Divider />
      <TableTicket
        listTicket={listTicket}
        activePage={activePage}
        totalItem={totalItem}
        paramGet={paramGet}
        getTicketDispatch={getTicketDispatch}
        setTicketSelected={setTicketSelected}
        ticketSelected={ticketSelected}
        onUpdateTicket={updateTicketDispatch}
        activities={activities}
        getTicketDetailDispatch={getTicketDetailDispatch}
        ticketDetail={ticketDetail}
        isCheckedAll={isCheckedAll}
        setCheckedAll={setCheckedAllTicketHandle}
        indeterminate={indeterminate}
        setIndeterminate={setIndeterminateTicketHandle}
      />
    </div>
  );
}
export default memo(TicketList);
