import React, { memo, useCallback, useState } from "react";
import { Checkbox } from "antd";
import { LIMIT_TICKET } from "@Constants/common";
import TableTicketRecord from "./TableTicketRecord";
import PaginationCommon from "@Components/common/PaginationCommon";
import { useTranslation } from "react-i18next";
import { isAdmin, isMember } from "../../../services/common";
import TicketDetail from "../TicketDetail";

function TableTicket({
  listTicket,
  activePage,
  totalItem,
  paramGet,
  getTicketDispatch,
  ticketSelected,
  setTicketSelected,
  onUpdateTicket,
  activities,
  getTicketDetailDispatch,
  ticketDetail,
  isCheckedAll,
  setCheckedAll,
  indeterminate,
  setIndeterminate,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataPreview, setDataPreview] = useState({
    buildingName: "",
    floorName: "",
  });
  const { t } = useTranslation();

  const selectAllDotHandle = (e) => {
    setCheckedAll(e.target.checked);
    setIndeterminate(false);
    let dots = ticketSelected.slice();
    if (e.target.checked) {
      isAdmin()
        ? dots.push(...listTicket.filter((ele) => ele.status === "pending"))
        : dots.push(
            ...listTicket.filter(
              (ele) =>
                ele.status === "pending" &&
                ele.type !== "book" &&
                ele.type !== "extend"
            )
          );
      setTicketSelected(dots);
    } else {
      setTicketSelected([]);
    }
  };
  const groupCheckboxChange = (checkedList) => {
    setTicketSelected(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < listTicket.length
    );
    setCheckedAll(checkedList.length === listTicket.length);
  };
  const handlePagination = (pagination) => {
    getTicketDispatch({
      ...paramGet,
      page: pagination,
      size: LIMIT_TICKET,
    });
    setCheckedAll(false);
    setIndeterminate(false);
    setTicketSelected([]);
  };
  const showModal = useCallback((id, buildingName, floorName) => {
    getTicketDetailDispatch(id);
    setDataPreview({
      buildingName: buildingName || "-",
      floorName: floorName || "-",
    });
    setIsModalVisible(true);
  }, []);
  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  return (
    <div className="list-body">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "2%" }}>
                {!isMember() && (
                  <Checkbox
                    onChange={selectAllDotHandle}
                    indeterminate={indeterminate}
                    checked={isCheckedAll}
                  />
                )}
              </th>
              <th style={{ width: "15%" }}>{t("ticket.owner")}</th>
              <th style={{ width: "10%" }}>{t("ticket.username")}</th>
              <th style={{ width: "12%" }}>{t("ticket.building")}</th>
              <th style={{ width: "5%" }}>{t("ticket.floor")}</th>
              <th style={{ width: "5%" }}>{t("ticket.division")}</th>
              <th style={{ width: "8%" }}>{t("ticket.department")}</th>
              <th style={{ width: "10%" }}>{t("ticket.startDate")}</th>
              <th style={{ width: "10%" }}>{t("ticket.endDate")}</th>
              <th style={{ width: "10%" }}>{t("ticket.status")}</th>
              <th style={{ width: "8%" }}>{t("ticket.quantity")}</th>
              <th>{t("ticket.actions")}</th>
            </tr>
          </thead>
        </table>
        <Checkbox.Group value={ticketSelected} onChange={groupCheckboxChange}>
          <table className="table">
            <tbody className={screen.width === 1920 && "body-sx"}>
              {listTicket.map((ele, key) => (
                <TableTicketRecord
                  key={key}
                  record={ele}
                  onUpdateTicket={onUpdateTicket}
                  activities={activities}
                  onShowModal={showModal}
                />
              ))}
            </tbody>
          </table>
        </Checkbox.Group>
      </div>
      <PaginationCommon
        page={activePage}
        size={LIMIT_TICKET}
        count={listTicket.length}
        totalItem={totalItem}
        onPagination={handlePagination}
      />
      <TicketDetail
        visible={isModalVisible}
        onOk={() => {}}
        onCancel={handleCancel}
        data={ticketDetail}
        dataPreview={dataPreview}
        activities={activities}
      />
    </div>
  );
}

export default memo(TableTicket);
