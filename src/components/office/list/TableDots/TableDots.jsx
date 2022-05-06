import React, { memo } from "react";
import { Checkbox } from "antd";
import { LIMIT } from "@Constants/common";
import TableDotRecord from "./TableDotRecord";
import PaginationCommon from "@Components/common/PaginationCommon";
import { useTranslation } from "react-i18next";
import {
  checkPermission,
  isAdmin,
  isMember,
} from "../../../../services/common";
import { getStorage } from "../../../../http";

function TableDots({
  listDot,
  activePage,
  totalItem,
  paramGet,
  dotSelected,
  setDotSelected,
  getDotListDispatch,
  isCheckedAll,
  setCheckedAll,
  indeterminate,
  setIndeterminate,
  updateDotListDispatch,
  assignDotDispatch,
  activeDotListDispatch,
  activities,
}) {
  const { t } = useTranslation();
  const selectAllDotHandle = (e) => {
    setCheckedAll(e.target.checked);
    setIndeterminate(false);
    let dots = dotSelected.slice();
    if (e.target.checked) {
      let listDotCheckable = isAdmin()
        ? listDot
        : listDot.filter((ele) => ele.department === getStorage("department"));
      dots.push(...listDotCheckable);
      setDotSelected(dots);
    } else {
      setDotSelected([]);
    }
  };
  const groupCheckboxChange = (checkedList) => {
    setDotSelected(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < listDot.length
    );
    setCheckedAll(checkedList.length === listDot.length);
  };
  const handlePagination = (pagination) => {
    getDotListDispatch({
      ...paramGet,
      page: pagination,
      size: LIMIT,
    });
  };
  const renderActions = () => {
    if (
      checkPermission(activities, "delete") ||
      checkPermission(activities, "edit") ||
      checkPermission(activities, "swap-dot")
    ) {
      return <th style={{ width: "7%" }}>{t("office.actions")}</th>;
    }
  };

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
              <th style={{ width: "15%" }}>{t("office.owner")}</th>
              <th style={{ width: "15%" }}>{t("office.member")}</th>
              <th style={{ width: "5%" }}>{t("office.username")}</th>
              <th style={{ width: "10%" }}>{t("office.building")}</th>
              <th style={{ width: "7%" }}>{t("office.floor")}</th>
              <th style={{ width: "5%" }}>{t("office.division")}</th>
              <th style={{ width: "5%" }}>{t("office.department")}</th>
              <th style={{ width: "7%" }}>{t("office.startDate")}</th>
              <th style={{ width: "7%" }}>{t("office.endDate")}</th>
              <th style={{ width: "9%" }}>{t("office.status")}</th>
              {checkPermission(activities, "enable") && (
                <th style={{ width: "6%" }}>{t("office.switch")}</th>
              )}
              {renderActions()}
            </tr>
          </thead>
        </table>
        <Checkbox.Group value={dotSelected} onChange={groupCheckboxChange}>
          <table className="table">
            <tbody
              className={`${
                !checkPermission(activities, "reclaim-ticket") ? "member" : ""
              } ${screen.width === 1920 ? "body-sx" : ""}`}
            >
              {listDot.map((ele, key) => (
                <TableDotRecord
                  key={key}
                  record={ele}
                  activities={activities}
                  updateDotListDispatch={updateDotListDispatch}
                  assignDotDispatch={assignDotDispatch}
                  activeDotListDispatch={activeDotListDispatch}
                />
              ))}
            </tbody>
          </table>
        </Checkbox.Group>
      </div>
      <PaginationCommon
        page={activePage}
        size={LIMIT}
        count={listDot.length}
        totalItem={totalItem}
        onPagination={handlePagination}
      />
    </div>
  );
}

export default memo(TableDots);
