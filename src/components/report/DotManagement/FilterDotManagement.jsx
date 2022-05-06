import { Button, DatePicker, Input, Select } from "antd";
import moment from "moment";
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DOT_FILTER, LIMIT } from "../../../constants/common";
import { onEnterEvent } from "../../../services/common";
import { DownloadOutlined } from "@ant-design/icons";
const { Option } = Select;

function FilterDotManagement({
  onSubmit,
  getFloorEnableByBuildingIdDispatch,
  listBuildingEnable,
  listFloorEnable,
  listGroupDepartment,
  onExport,
}) {
  const [paramDot, setParamDot] = useState({
    buildingId: "",
    floorIds: [],
    department: "",
    username: "",
    exportDate: moment().format("YYYY-MM-DD"),
    status: [],
    page: 1,
    size: LIMIT,
  });
  const [devision, setDevision] = useState(null);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [listDepartment, setListDepartment] = useState([]);
  const { t } = useTranslation();

  const selectBuildingHandle = (value) => {
    getFloorEnableByBuildingIdDispatch(value);
    setParamDot({ ...paramDot, buildingId: value, floorIds: [] });
    onSubmit({
      ...paramDot,
      buildingId: value,
      floorIds: [],
      department:
        paramDot.department !== "" ? paramDot.department : devision || "",
    });
  };

  const selectFloorHandle = (value) => {
    setParamDot({
      ...paramDot,
      floorIds: value,
    });
    onSubmit({
      ...paramDot,
      floorIds: value,
      department:
        paramDot.department !== "" ? paramDot.department : devision || "",
    });
  };

  const selectGroupHandle = (value) => {
    let groupIdx = listGroupDepartment.findIndex((ele) => ele.name === value);
    setListDepartment(listGroupDepartment[groupIdx].listChild || []);
    setParamDot({
      ...paramDot,
      department:
        listGroupDepartment[groupIdx]?.listChild?.sort((a, b) =>
          a.name.localeCompare(b.name)
        )?.[0]?.name || "",
    });
    setDevision(value);
    onSubmit({
      ...paramDot,
      department:
        paramDot.department !== "" ? paramDot.department : value || "",
    });
  };

  const selectDepartmentHandle = (value) => {
    setParamDot({
      ...paramDot,
      department: value,
    });
    onSubmit({
      ...paramDot,
      department: value,
    });
  };

  const changeDateHandle = (date, dateString) => {
    setDate(dateString);
    setParamDot({
      ...paramDot,
      exportDate: date.format("YYYY-MM-DD"),
    });
    onSubmit({
      ...paramDot,
      exportDate: date.format("YYYY-MM-DD"),
      department:
        paramDot.department !== "" ? paramDot.department : value || "",
    });
  };

  const selectStatusHandle = (value) => {
    setParamDot({
      ...paramDot,
      status: value,
    });
    onSubmit({
      ...paramDot,
      status: value,
      department:
        paramDot.department !== "" ? paramDot.department : value || "",
    });
  };
  const exportHandle = async () => {
    onExport(paramDot);
  };

  return (
    <>
      <div
        className="filter-wapper"
        onKeyDown={(e) =>
          onEnterEvent(e, () =>
            onSubmit({
              ...paramDot,
              department:
                paramDot.department !== "" ? paramDot.department : value || "",
            })
          )
        }
      >
        <div className="filter">
          <div className="filter-item">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              style={{ fontSize: 12, width: "100%" }}
              placeholder={t("office.selectBuilding")}
              onChange={selectBuildingHandle}
              value={paramDot.buildingId || null}
            >
              {listBuildingEnable.map((buildingData, key) => (
                <Option value={buildingData.id} key={`${key}-building`}>
                  {buildingData.buildingName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <Select
              mode="multiple"
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              style={{ fontSize: 12, width: "100%" }}
              placeholder={t("office.selectFloor")}
              onChange={selectFloorHandle}
              maxTagCount={"responsive"}
              value={paramDot.floorIds}
            >
              {listFloorEnable.map((floor, key) => (
                <Option value={floor.id} key={`${key}-floor`}>
                  {floor.floorName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="filter-item">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              style={{ fontSize: 12, width: "100%" }}
              placeholder={t("office.selectGroup")}
              onChange={selectGroupHandle}
              value={devision}
            >
              {listGroupDepartment
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((ele, key) => (
                  <Option value={ele.name} key={`${key}-group`}>
                    {ele.name}
                  </Option>
                ))}
            </Select>
          </div>
          <div className="filter-item">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              style={{ fontSize: 12, width: "100%" }}
              placeholder={t("office.selectDepartment")}
              onChange={selectDepartmentHandle}
              value={paramDot.department || null}
            >
              {listDepartment
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((ele, key) => (
                  <Option value={ele.name} key={`${key}-department`}>
                    {ele.name}
                  </Option>
                ))}
            </Select>
          </div>
          <div className="filter-item">
            <DatePicker
              onChange={changeDateHandle}
              allowClear={false}
              // picker="month"
              style={{ fontSize: 12, width: "100%" }}
              value={date ? moment(date) : null}
            />
          </div>
          <div className="filter-item">
            <Input
              value={paramDot.username}
              placeholder={t("office.search")}
              onChange={(e) =>
                setParamDot({ ...paramDot, username: e.target.value.trim() })
              }
              onKeyPress={(e) => {
                e.key === "Enter" &&
                  onSubmit({
                    ...paramDot,
                    department:
                      paramDot.department !== ""
                        ? paramDot.department
                        : value || "",
                  });
              }}
              style={{ fontSize: 12, width: "100%", padding: "6px 11px" }}
            />
          </div>
          <div className="filter-item">
            <Select
              mode="multiple"
              allowClear
              showSearch
              maxTagCount={"responsive"}
              style={{ fontSize: 12, width: "100%" }}
              placeholder={t("office.searchByStatus")}
              value={paramDot.status}
              onChange={selectStatusHandle}
            >
              {DOT_FILTER.map((ele, key) => (
                <Option value={ele.value} key={key}>
                  {ele.title}
                </Option>
              ))}
            </Select>
          </div>

          <div className="filter-item">
            <Button
              type="text"
              onClick={() => {
                setParamDot({
                  ...paramDot,
                  buildingId: "",
                  floorIds: [],
                  department: "",
                  username: "",
                  exportDate: moment().format("YYYY-MM-DD"),
                  status: [],
                });
                setDevision(null);
                setDate(moment().format("YYYY-MM-DD"));
                setListDepartment([]);
                onSubmit({
                  buildingId: "",
                  floorIds: [],
                  department: "",
                  username: "",
                  exportDate: moment().format("YYYY-MM-DD"),
                  status: [],
                  page: 1,
                  size: LIMIT,
                });
              }}
            >
              {t("common.reset")}
            </Button>
            <Button
              type="primary"
              onClick={() =>
                onSubmit({
                  ...paramDot,
                  department:
                    paramDot.department !== ""
                      ? paramDot.department
                      : value || "",
                })
              }
            >
              {t("common.filter")}
            </Button>
          </div>
        </div>

        <div className="export-wapper">
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={exportHandle}
          >
            Export
          </Button>
        </div>
      </div>
    </>
  );
}
export default memo(FilterDotManagement);
