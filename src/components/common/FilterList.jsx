import React, { memo, useState } from "react";
import { Select, DatePicker, Input, Button } from "antd";
import { DOT_FILTER, LIMIT, LIMIT_TICKET } from "@Constants/common";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { SCREEN, TICKET_FILTER } from "../../constants/common";
import {
  isAdmin,
  isAdminOrDuLead,
  isDuLead,
  isMember,
  onEnterEvent,
} from "../../services/common";
import { getStorage } from "../../http";

const { Option } = Select;
const { RangePicker } = DatePicker;
function FilterList({
  onSubmit,
  getFloorEnableByBuildingIdDispatch,
  listBuildingEnable,
  listFloorEnable,
  listGroupDepartment,
  screen = "office",
}) {
  const [paramDot, setParamDot] = useState({
    buildingId: "",
    floorIds: [],
    department:
      (screen !== SCREEN.ticket && !isAdmin()) ||
      (screen === SCREEN.ticket && isDuLead())
        ? getStorage("department")
        : "",
    username:
      screen === SCREEN.ticket && isMember()
        ? getStorage("user")?.userName
        : "",
    status: screen === SCREEN.ticket ? [TICKET_FILTER[0].value] : [],
    date: "",
    fromDate: "",
    toDate: "",
    page: 1,
    size: screen === SCREEN.ticket ? LIMIT_TICKET : LIMIT,
  });
  const [devision, setDevision] = useState(null);
  const [listDepartment, setListDepartment] = useState([]);
  const { t } = useTranslation();

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
  };

  const selectBuildingHandle = (value) => {
    getFloorEnableByBuildingIdDispatch(value);
    setParamDot({ ...paramDot, buildingId: value, floorIds: [] });
  };
  const changeDateHandle = (_, dateString) => {
    setParamDot({
      ...paramDot,
      date: dateString,
    });
  };
  const handleRangeChange = (val) => {
    setParamDot({
      ...paramDot,
      fromDate: val[0].format("YYYY-MM-DD"),
      toDate: val[1].format("YYYY-MM-DD"),
    });
  };
  const selectFloorHandle = (value) => {
    setParamDot({
      ...paramDot,
      floorIds: value,
    });
  };
  const selectStatusHandle = (value) => {
    setParamDot({
      ...paramDot,
      status: value,
    });
  };
  const selectDepartmentHandle = (value) => {
    setParamDot({
      ...paramDot,
      department: value,
    });
  };
  console.log("param", paramDot);

  return (
    <>
      <div
        className="filter-wapper"
        onKeyDown={(e) =>
          onEnterEvent(e, () => {
            if (screen !== SCREEN.ticket) {
              delete paramDot.date;
            } else {
              delete paramDot.fromDate;
              delete paramDot.toDate;
            }
            onSubmit({
              ...paramDot,
              department:
                paramDot.department !== ""
                  ? paramDot.department
                  : devision || "",
            });
          })
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
          {isAdmin() ? (
            <div className="filter-item">
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
          ) : (
            ""
          )}
          {isAdmin() ? (
            <div className="filter-item">
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
          ) : (
            ""
          )}
          <div className={`filter-item ${screen !== SCREEN.ticket && "big"}`}>
            {screen !== SCREEN.ticket ? (
              <RangePicker
                style={{ width: "100%" }}
                value={
                  paramDot.fromDate
                    ? [
                        moment(paramDot.fromDate, "YYYY-MM-DD"),
                        moment(paramDot.toDate, "YYYY-MM-DD"),
                      ]
                    : null
                }
                onChange={handleRangeChange}
                allowClear={false}
              />
            ) : (
              <DatePicker
                onChange={changeDateHandle}
                format={"YYYY-MM-DD"}
                style={{ fontSize: 12, width: "100%" }}
                value={paramDot.date ? moment(paramDot.date) : null}
                allowClear={false}
              />
            )}
          </div>
          {isAdminOrDuLead() && (
            <div className="filter-item">
              <Input
                value={paramDot.username}
                placeholder={t("office.search")}
                onChange={(e) =>
                  setParamDot({ ...paramDot, username: e.target.value.trim() })
                }
                style={{ fontSize: 12, width: "100%", padding: "6px 11px" }}
              />
            </div>
          )}
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
              {screen === SCREEN.ticket ? (
                TICKET_FILTER.map((ele) => (
                  <Option value={ele.value} key={ele.key}>
                    {ele.title}
                  </Option>
                ))
              ) : (
                <>
                  {DOT_FILTER.map((ele, key) => (
                    <Option value={ele.value} key={key}>
                      {ele.title}
                    </Option>
                  ))}
                </>
              )}
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
                  department:
                    (screen !== SCREEN.ticket && !isAdmin()) ||
                    (screen === SCREEN.ticket && isDuLead())
                      ? getStorage("department")
                      : "",
                  username:
                    screen === SCREEN.ticket && isMember()
                      ? getStorage("user")?.userName
                      : "",
                  status:
                    screen === SCREEN.ticket ? [TICKET_FILTER[0].value] : [],
                  date: "",
                  fromDate: "",
                  toDate: "",
                });
                setDevision(null);
              }}
            >
              {t("common.reset")}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (screen !== SCREEN.ticket) {
                  delete paramDot.date;
                } else {
                  delete paramDot.fromDate;
                  delete paramDot.toDate;
                }
                onSubmit({
                  ...paramDot,
                  department:
                    paramDot.department !== ""
                      ? paramDot.department
                      : devision || "",
                });
              }}
            >
              {t("common.filter")}
            </Button>
          </div>
        </div>
      </div>
      <div className="filter-item-mobile">
        <Button
          type="text"
          onClick={() => {
            setParamDot({
              ...paramDot,
              buildingId: "",
              floorIds: [],
              department:
                (screen !== SCREEN.ticket && !isAdmin()) ||
                (screen === SCREEN.ticket && isDuLead())
                  ? getStorage("department")
                  : "",
              username:
                screen === SCREEN.ticket && isMember()
                  ? getStorage("user")?.userName
                  : "",
              status: screen === SCREEN.ticket ? [TICKET_FILTER[0].value] : [],
              date: "",
              fromDate: "",
              toDate: "",
            });
            setDevision(null);
          }}
        >
          {t("common.reset")}
        </Button>
        <Button
          type="primary"
          onClick={() => {
            if (screen !== SCREEN.ticket) {
              delete paramDot.date;
            } else {
              delete paramDot.fromDate;
              delete paramDot.toDate;
            }
            onSubmit({
              ...paramDot,
              department:
                paramDot.department !== ""
                  ? paramDot.department
                  : devision || "",
            });
          }}
        >
          {t("common.filter")}
        </Button>
      </div>
    </>
  );
}

export default memo(FilterList);
