import { Collapse, Tooltip, Typography } from "antd";
import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { convertColor } from "../../../services/common";
import { CaretRightOutlined } from "@ant-design/icons";

const { Title } = Typography;
function DotSelectedItem({ item, onUnselected }) {
  const { t } = useTranslation();
  const dotInfo = useMemo(() => {
    let occupied = item.dotInfoByTimeDTOList?.find(
      (ele) => ele.status === "occupied"
    );
    let allocated = item.dotInfoByTimeDTOList?.find(
      (ele) => ele.status === "allocated"
    );
    let booked = item.dotInfoByTimeDTOList.find(
      (ele) => ele.status === "booked"
    );
    let available = {
      status: "available",
    };
    return occupied || allocated || booked || available;
  }, []);
  return (
    <>
      <div className={`list-item ${dotInfo.status}`}>
        <div className="title" onClick={() => onUnselected(item)}>
          <Title level={4}>
            {item.buildingName} - {item.floorName}
          </Title>
          <Tooltip
            color={convertColor(dotInfo.status)}
            placement="right"
            title={dotInfo.status}
          >
            <div
              className={`icon ${item.type === "seat" && "cicrle"} ${
                dotInfo.status
              } `}
            />
          </Tooltip>
        </div>
        <div className="content" onClick={() => onUnselected(item)}>
          <p>
            <span>{t("office.owner")}:</span> {dotInfo.ownerFullName || "-"}
          </p>
          <p>
            <span>{t("office.member")}:</span>{" "}
            {dotInfo.username
              ? `${dotInfo.username}(${dotInfo.fullName})`
              : "-"}
          </p>
          <p>
            <span>{t("office.timeRange")}:</span>{" "}
            {dotInfo.fromDate ? `${dotInfo.fromDate} - ${dotInfo.toDate}` : "-"}
          </p>
        </div>
        {dotInfo.status !== "available" && (
          <div className="history">
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Collapse.Panel
                // showArrow={false}
                header={
                  <p>
                    <span>Dot status:</span>
                  </p>
                }
              >
                {item.dotInfoByTimeDTOList.map((ele, key) => (
                  <p key={key}>
                    * {ele.status} : {ele.fromDate} - {ele.toDate}
                  </p>
                ))}
              </Collapse.Panel>
            </Collapse>
          </div>
        )}
      </div>
    </>
  );
}
export default memo(DotSelectedItem);
