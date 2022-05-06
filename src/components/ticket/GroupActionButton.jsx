import { Button, Popover } from "antd";
import React, { memo, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { checkPermission } from "../../services/common";
function GroupActionButton({
  onUpdateTicket,
  ticketSelected,
  activities,
  setCheckedAll,
  setIndeterminate,
}) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const updateTicketHandle = (action) => {
    onUpdateTicket({
      tickets: ticketSelected.map((e) => {
        return { id: e.id, type: e.type };
      }),
      action,
    });
    setVisible(false);
    setCheckedAll(false);
    setIndeterminate(false);
  };
  const handleClickChange = (visible) => {
    setVisible(visible);
  };
  return (
    <div className="group-action-button">
      <Popover
        placement="bottom"
        content={
          <div className="dropdown-menu">
            {checkPermission(activities, "ticket-approve") && (
              <Button
                type="text"
                disabled={ticketSelected.length === 0}
                onClick={() => updateTicketHandle("approve")}
              >
                {t("ticket.approve")}
              </Button>
            )}
            {checkPermission(activities, "ticket-reject") && (
              <Button
                type="text"
                disabled={ticketSelected.length === 0}
                onClick={() => updateTicketHandle("reject")}
              >
                {t("ticket.reject")}
              </Button>
            )}
          </div>
        }
        trigger={ticketSelected.length !== 0 ? "click" : ""}
        visible={visible}
        onVisibleChange={handleClickChange}
      >
        <Button type="primary" disabled={ticketSelected.length === 0}>
          {t("office.actions")} <DownOutlined />
        </Button>
      </Popover>
    </div>
  );
}
export default memo(GroupActionButton);
