import React, { memo, useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { DOT_FILTER, DOT_ROOM_FILTER } from "@Constants/common";
import { RedoOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function FilterStatus({
  onSelectDotByStatus,
  setFilterList,
  filterList,
  setFilter,
  typeSelect,
}) {
  const [active, setActive] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    if (filterList.isFilter === false) {
      console.log("ok");
      setActive("");
      setFilter(false);
    }
  }, [filterList]);
  return (
    <div className="filter-dot-wapper">
      <div className="filter-dot">
        <p className="title">
          {t("office.filterSeat")}
          <Tooltip placement="topLeft" title={<span>Reset</span>}>
            <Button
              className={"btn-dot"}
              type="text"
              icon={<RedoOutlined />}
              onClick={() => {
                setActive("");
                setFilterList([]);
                setFilter(false);
              }}
            />
          </Tooltip>
        </p>
        {DOT_FILTER.slice(typeSelect === "view" ? 1 : 0).map((ele, key) => {
          return (
            <Button
              className={`btn-dot ${active === ele.key && "active"}`}
              type="text"
              block
              icon={<div className={`icon ${ele.value} circle `} />}
              key={`${key}-seat`}
              onClick={() => {
                setActive(ele.key);
                onSelectDotByStatus(ele.value, "seat");
                setFilter(true);
              }}
            >
              {ele.title}
            </Button>
          );
        })}
      </div>

      {/* <div className="filter-dot">
        <p className="title">{t("office.filterRoom")}</p>
        {DOT_ROOM_FILTER.map((ele, key) => {
          return (
            <Button
              className={`btn-dot ${active === ele.key && "active"}`}
              type="text"
              block
              icon={<div className={`icon ${ele.value} `} />}
              key={`${key}-seat`}
              onClick={() => {
                setActive(ele.key);
                onSelectDotByStatus(ele.value, "room");
                setFilter(true);
              }}
            >
              {ele.title}
            </Button>
          );
        })}
      </div> */}
    </div>
  );
}
export default memo(FilterStatus);
