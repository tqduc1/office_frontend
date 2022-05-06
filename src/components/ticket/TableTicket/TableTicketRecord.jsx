import React, { memo, useState } from "react";
import { Checkbox, Tag, Button, Popover } from "antd";
import {
  convertColor,
  checkPermission,
  convertTicketColor,
  isAdmin,
  isDuLead,
} from "@Services/common";
import { EllipsisOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { isMember } from "../../../services/common";

function TableTicketRecord({
  record,
  onUpdateTicket,
  activities,
  onShowModal,
}) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const updateTicketHandle = (action) => {
    onUpdateTicket({
      tickets: [{ id: record.id, type: record.type }],
      action,
    });
    setVisible(false);
  };
  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };
  const renderApproveButton = () => {
    if (checkPermission(activities, "ticket-approve")) {
      if (
        (isDuLead() && record.type !== "book" && record.type !== "extend") ||
        isAdmin()
      ) {
        return (
          <Button type="text" onClick={() => updateTicketHandle("approve")}>
            {t("ticket.approve")}
          </Button>
        );
      }
    }
  };
  const renderCheckbox = () => {
    if (
      (isDuLead() && record.type !== "book" && record.type !== "extend") ||
      isAdmin()
    ) {
      return <Checkbox value={record} disabled={record.status !== "pending"} />;
    }
  };
  return (
    <tr>
      <td style={{ width: "2%" }}>{renderCheckbox()}</td>
      <td
        style={{ width: "15%" }}
        onClick={() => {
          onShowModal(record.id, record.buildingName, record.floorName);
        }}
      >
        {record.owner || "_"}
      </td>
      <td
        style={{ width: "10%" }}
        onClick={() => {
          onShowModal(record.id, record.buildingName, record.floorName);
        }}
      >
        {record.username || "_"}
      </td>
      <td
        style={{ width: "12%" }}
        onClick={() => {
          onShowModal(record.id, record.buildingName, record.floorName);
        }}
      >
        {record.buildingName || "_"}
      </td>
      <td
        style={{ width: "5%" }}
        onClick={() => {
          onShowModal(record.id, record.buildingName, record.floorName);
        }}
      >
        {record.floorName || "_"}
      </td>
      <td
        style={{ width: "5%" }}
        onClick={() => {
          onShowModal(record.id, record.buildingName, record.floorName);
        }}
      >
        {record.group || "_"}
      </td>
      <td
        style={{ width: "8%" }}
        onClick={() => {
          onShowModal(record.id, record.buildingName, record.floorName);
        }}
      >
        {record.department || "_"}
      </td>
      <td
        style={{ width: "10%" }}
        onClick={() => {
          onShowModal(record.id, record.buildingName, record.floorName);
        }}
      >
        {record.fromDate || "_"}
      </td>
      <td
        style={{ width: "10%" }}
        onClick={() => {
          onShowModal(record.id, record.buildingName, record.floorName);
        }}
      >
        {record.toDate || "_"}
      </td>
      <td
        style={{ width: "10%" }}
        onClick={() => {
          onShowModal(record.id, record.buildingName, record.floorName);
        }}
      >
        <Tag
          color={convertColor(record.status?.toLowerCase())}
          style={{
            width: 65,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {record.status.toUpperCase()}
        </Tag>
        <Tag
          color={convertTicketColor(record.type?.toLowerCase())}
          style={{
            width: 65,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {record.type?.toUpperCase()}
        </Tag>
      </td>
      <td
        style={{ width: "8%" }}
        onClick={() => {
          onShowModal(record.id, record.buildingName, record.floorName);
        }}
      >
        {record.quantity || "_"}
      </td>
      <td>
        {record.status !== "pending" ? (
          <EllipsisOutlined />
        ) : (
          <Popover
            placement="bottomLeft"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            content={
              <div className="dropdown-menu">
                {renderApproveButton()}
                {(checkPermission(activities, "ticket-reject") ||
                  isMember()) && (
                  <Button
                    type="text"
                    onClick={() => updateTicketHandle("reject")}
                    style={{ width: "100%" }}
                  >
                    {t("ticket.reject")}
                  </Button>
                )}
              </div>
            }
            trigger="click"
          >
            <EllipsisOutlined
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            />
          </Popover>
        )}
      </td>
    </tr>
  );
}
export default memo(TableTicketRecord);
