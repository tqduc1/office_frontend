import React, { memo, useEffect, useMemo, useState } from "react";
import { Button, Popover, Typography, Input, Tooltip, DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  checkPermission,
  convertColor,
  convertTicketType,
  isAdmin,
  isMember,
} from "../../services/common";
import { TYPE_SELECT } from "../../constants/common";
import { getStorage } from "../../http";

const { Title } = Typography;
const { RangePicker } = DatePicker;

function Dot({
  item,
  isSelected,
  onUnselected,
  onSelected,
  createTicketDispatch,
  typeSelect,
  reclaimDotListDispatch,
  assignDotDispatch,
  activities,
  preview = false,
}) {
  const [selected, setSelected] = useState(false);
  const [visible, setVisible] = useState(false);

  const [ticketParam, setTicketParam] = useState({
    dotIds: [],
    fromDate: moment().format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
    type: TYPE_SELECT(activities)[0]?.value,
    owner: "",
  });
  const [assignParam, setAssignParam] = useState({
    username: "",
    status: "occupied",
    screen: "map",
  });
  const dotInfo = useMemo(() => {
    let occupied = item.dotInfoByTimeDTOList.find(
      (ele) => ele.status === "occupied"
    );
    let allocated = item.dotInfoByTimeDTOList.find(
      (ele) => ele.status === "allocated"
    );
    let booked = item.dotInfoByTimeDTOList.find(
      (ele) => ele.status === "booked"
    );
    let available = {
      status: "available",
    };
    return occupied || allocated || booked || available;
  }, [item]);

  const { t } = useTranslation();
  useEffect(() => {
    setTicketParam({
      ...ticketParam,
      dotIds: [item.id],
      fromDate: item.fromDate ? item.fromDate : moment().format("YYYY-MM-DD"),
      toDate: item.toDate ? item.toDate : moment().format("YYYY-MM-DD"),
      type: convertTicketType(dotInfo.status),
      owner: isMember() && getStorage("user")?.userName,
    });
  }, [item]);

  useEffect(() => {
    setSelected(isSelected);
    return () => {
      setSelected(false);
    };
  }, [isSelected]);
  const handleChangeUsername = (e) => {
    setAssignParam({ ...assignParam, username: e.target.value });
  };

  const handleRangeChange = (val) => {
    setTicketParam({
      ...ticketParam,
      fromDate: val[0].format("YYYY-MM-DD"),
      toDate: val[1].format("YYYY-MM-DD"),
    });
  };
  const handleCreateTicket = () => {
    createTicketDispatch({
      ...ticketParam,
      type: convertTicketType(dotInfo.status),
      owner: getStorage("user")?.userName,
    });
    setVisible(false);
  };
  const handleReclaimDot = () => {
    reclaimDotListDispatch({
      listDotInfoByTimeIds: [item.id],
      fromDate: item.fromDate,
      toDate: item.toDate,
      status: "allocated",
      screen: "map",
    });
    setVisible(false);
  };
  const handleAssignDot = () => {
    assignDotDispatch({
      id: dotInfo.id,
      ...assignParam,
    });
    setVisible(false);
  };

  const dotDetail = (
    <div className={"popup-menu-office"}>
      <div className="title">
        <Title level={3}>
          {item.buildingName} - {item.floorName}
        </Title>
        <Tooltip color={convertColor(dotInfo.status)} title={dotInfo.status}>
          <div
            className={`icon ${item.type === "seat" && "cicrle"} ${
              dotInfo.status
            } `}
          />
        </Tooltip>
      </div>
      <div className="content">
        <p>
          <span>{t("office.owner")}:</span> {dotInfo.ownerFullName || "-"}
        </p>
        <p>
          <span>{t("office.member")}:</span>{" "}
          {dotInfo.username ? `${dotInfo.username}(${dotInfo.fullName})` : "-"}
        </p>
        <p>
          <span>{t("office.timeRange")}:</span>{" "}
          {dotInfo.fromDate ? `${dotInfo.fromDate} - ${dotInfo.toDate}` : "-"}
        </p>
        {!preview && dotInfo.status === "allocated" && (
          <Input
            placeholder="Assign Username"
            onChange={handleChangeUsername}
            defaultValue={isMember() ? getStorage("user")?.userName : ""}
            readOnly={isMember() || dotInfo.status === "occupied"}
          />
        )}
        {!preview && !isMember() && dotInfo.status === "available" ? (
          <RangePicker
            style={{ width: "100%" }}
            value={[
              moment(ticketParam.fromDate, "YYYY-MM-DD"),
              moment(ticketParam.toDate, "YYYY-MM-DD"),
            ]}
            disabledDate={(current) => {
              return current && current < moment().subtract(1, "day");
            }}
            allowClear={false}
            onChange={handleRangeChange}
          />
        ) : (
          <></>
        )}
        {!preview ? (
          <>
            <div className="group-btn">
              <Button type="text" onClick={() => setVisible(false)}>
                {t("common.cancel")}
              </Button>
              {(isMember() &&
                dotInfo.department === getStorage("department") &&
                dotInfo.status === "allocated") ||
              (!isMember() && dotInfo.status === "available") ? (
                <Button type="primary" onClick={handleCreateTicket}>
                  {t("common.push")}
                </Button>
              ) : (
                <></>
              )}
              {checkPermission(activities, "assign-allocated-dot") &&
              !isMember() &&
              dotInfo.department === getStorage("department") &&
              dotInfo.status === "allocated" ? (
                <Button type="primary" onClick={handleAssignDot}>
                  Assign
                </Button>
              ) : (
                <></>
              )}
              {/* {checkPermission(activities, "reclaim-ticket") &&
              !isMember() &&
              dotInfo.department === getStorage("department") &&
              dotInfo.status === "occupied" ? (
                <Button type="primary" onClick={handleReclaimDot}>
                  Reclaim
                </Button>
              ) : (
                <></>
              )} */}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
  const filterTypeSelect = (dotInfo, typeSelect) => {
    switch (typeSelect) {
      // case "book":
      case "action":
        return !preview && item.isActive && dotInfo.status === "available";
      // case "reclaim":
      //   if (isAdmin()) {
      //     return !preview && item.isActive && dotInfo.status !== "available";
      //   } else {
      //     return (
      //       !preview &&
      //       item.isActive &&
      //       dotInfo.status !== "available" &&
      //       dotInfo.owner === getStorage("user")?.userName
      //     );
      //   }
      // case "extend":
      //   return (
      //     !preview &&
      //     item.isActive &&
      //     dotInfo.status !== "available" &&
      //     dotInfo.owner === getStorage("user")?.userName
      //   );
      case "view":
        return !preview && item.isActive && dotInfo.status !== "available";
      default:
        return !preview && item.isActive && dotInfo.status === "available";
    }
  };
  const toogleBtn = () => {
    if (filterTypeSelect(dotInfo, typeSelect)) {
      setSelected(!selected);
      if (!selected) {
        onSelected(item);
      } else {
        onUnselected(item);
      }
    }
  };
  const handleClickChange = (visible) => {
    setVisible(visible);
  };
  return (
    <div
      style={{
        position: "absolute",
        top: item.coordinateY,
        left: item.coordinateX,
      }}
      id={item.id}
      data={item}
      status={dotInfo.status}
      active={item.isActive.toString()}
      department={dotInfo.department || "-"}
      owner={dotInfo.owner || "-"}
      className={"dot"}
    >
      <Popover
        placement="bottomLeft"
        content={dotDetail}
        trigger={preview ? "click" : "contextMenu"}
        visible={item.isActive && visible}
        onVisibleChange={handleClickChange}
      >
        <Button
          type="default"
          shape="circle"
          className={`${item.type === "seat" ? "cicrle" : "square"} ${
            selected ? "selected" : ""
          } ${dotInfo.status?.toLowerCase()} ${!item.isActive && "disable"}`}
          onClick={toogleBtn}
          onTouchStart={toogleBtn}
          icon={
            <div
              className={`${item.type === "seat" ? "cicrle" : "square"}  ${
                selected ? "selected" : ""
              } ${dotInfo.status?.toLowerCase()} ${
                !item.isActive && "disable"
              }`}
            />
          }
        />
      </Popover>
    </div>
  );
}
export default memo(Dot);
