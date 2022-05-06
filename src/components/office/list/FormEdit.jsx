import React from "react";
import { Typography, Select, Button } from "antd";
import { DOT_FILTER } from "@Constants/common";
import { useTranslation } from "react-i18next";
import { uniqBy } from "@Services/common";
import { memo } from "react";
import { isDuLead } from "../../../services/common";
const { Title } = Typography;

function FormEdit({
  dotSelected,
  setDotSelected,
  setCheckedAll,
  setIndeterminate,
  updateDotListDispatch,
}) {
  const { t } = useTranslation();
  const handleUpdateDot = () => {
    if (dotSelected.length > 0) {
      updateDotListDispatch({
        listDotInfoByTimeIds: dotSelected.map((ele) => ele.id),
        fromDate: isDuLead() ? dotSelected[0].fromDate : "",
        toDate: isDuLead() ? dotSelected[0].toDate : "",
        status: isDuLead() ? DOT_FILTER[1].value : DOT_FILTER[0].value,
        screen: "list",
      });
      handleReset();
    }
  };
  const handleReset = () => {
    setDotSelected([]);
    setCheckedAll(false);
    setIndeterminate(false);
  };
  return (
    <div className="form-edit-container">
      <div className="title">
        <Title level={3}>{t("office.editOfficeSeat")}</Title>
      </div>
      <div className="form-edit">
        <div className="layout-top">
          <div className="inline">
            <label>{t("office.username")}</label>
            <Select
              disabled
              maxTagCount={"responsive"}
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              value={uniqBy(
                dotSelected.map((ele) => ele.username),
                JSON.stringify
              )}
            />
          </div>
          <div className="inline">
            <label>{t("office.division")}</label>
            <Select
              disabled
              maxTagCount={"responsive"}
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              value={uniqBy(
                dotSelected.map((ele) => ele.group),
                JSON.stringify
              )}
            />
          </div>
          <div className="inline">
            <label>{t("office.department")}</label>
            <Select
              disabled
              maxTagCount={"responsive"}
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              value={uniqBy(
                dotSelected.map((ele) => ele.department),
                JSON.stringify
              )}
            />
          </div>
          <div className="inline">
            <label>{t("office.floor")}</label>
            <Select
              disabled
              mode="multiple"
              allowClear
              maxTagCount={"responsive"}
              style={{ width: "100%" }}
              value={uniqBy(
                dotSelected.map((ele) => ele.floorName),
                JSON.stringify
              )}
            />
          </div>
          <div className="inline">
            <Button type="primary" onClick={handleUpdateDot}>
              {t("common.save")}
            </Button>
            <Button type="text" onClick={handleReset}>
              {t("common.cancel")}
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="form-edit-right">
        <div className="inline">
          <label>{t("office.timeRange")}</label>
          <RangePicker
            style={{ width: "100%" }}
            value={[
              moment(updateParam.fromDate, "YYYY-MM-DD"),
              moment(updateParam.toDate, "YYYY-MM-DD"),
            ]}
            onChange={handleRangeChange}
          />
        </div>
        <div className="inline-flex">
          <div className="filter-item">
            <label>{t("office.status")}</label>
            <Select
              allowClear
              style={{ fontSize: 12, width: "100%" }}
              onChange={handleSelect}
              defaultValue={DOT_FILTER[0].value}
            >
              {DOT_FILTER.slice(0, 2).map((ele, key) => (
                <Option value={ele.value} key={key}>
                  {ele.title}
                </Option>
              ))}
            </Select>
          </div>

          <div className="filter-item">
            <Button type="primary" onClick={handleUpdateDot}>
              {t("common.save")}
            </Button>
            <Button type="text" onClick={handleReset}>
              {t("common.cancel")}
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default memo(FormEdit);
