import React, { memo, useEffect, useMemo, useState } from "react";
import {
  DatePicker,
  Select,
  Button,
  Tooltip,
  notification,
  Modal,
  Radio,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { NAV_HEIGHT, PADDING_TOP_SCREEN } from "@Constants/common";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { isAdmin, isMember } from "../../../services/common";
import debounce from "lodash.debounce";
import { searchDotRequest } from "../../../actions/DotAction";
import { useDispatch } from "react-redux";
import { TYPE_SELECT } from "../../../constants/common";
import { getStorage } from "../../../http";
import DotSelectedItem from "./DotSelectedItem";
const { Option } = Select;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

function Filter({
  onChangeBackround,
  checkedList,
  onClearSelectedDot,
  getGroupDepartmentDispatch,
  getBuildingDispatch,
  getFloorEnableByBuildingIdDispatch,
  getDotMapDispatch,
  listGroupDepartment,
  listBuildingEnable,
  listFloorEnable,
  dots,
  createTicketDispatch,
  listDotSearch,
  setTypeSelect,
  typeSelect,
  onUnselected,
  updateDotListDispatch,
  activities,
  setFilterList,
}) {
  const [listDepartment, setListDepartment] = useState([]);
  const [group, setGroup] = useState(null);
  const [ldap, setLdap] = useState(null);
  const [listDot, setListDot] = useState([]);
  const [searchDot, setSearchDot] = useState(false);
  const [ticketParam, setTicketParam] = useState({
    dotIds: [],
    fromDate: moment(new Date()).format("YYYY-MM-DD"),
    toDate: moment(new Date()).format("YYYY-MM-DD"),
    type: TYPE_SELECT(activities)[0]?.value,
    owner: getStorage("user")?.userName,
  });

  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    getGroupDepartmentDispatch();
    getBuildingDispatch({ getfloor: true });
    return () => {
      setParamDot({
        floorId: null,
        department: "",
        username: "",
        fromDate: moment(new Date()).format("YYYY-MM-DD"),
        toDate: moment(new Date()).format("YYYY-MM-DD"),
      });
      setListDepartment([]);
      setGroup(null);
    };
  }, []);
  const [paramDot, setParamDot] = useState({
    floorId: null,
    department: "",
    username: "",
    fromDate: moment(new Date()).format("YYYY-MM-DD"),
    toDate: moment(new Date()).format("YYYY-MM-DD"),
    date: moment(new Date()).format("YYYY-MM-DD"),
    typeSelect: typeSelect,
  });
  const [building, setBuilding] = useState(null);
  useEffect(() => {
    setParamDot({
      ...paramDot,
      typeSelect: typeSelect,
    });
  }, [typeSelect]);

  useEffect(() => {
    if (paramDot.floorId)
      getDotMapDispatch({
        ...paramDot,
        department:
          paramDot.department !== "" ? paramDot.department : group || "",
      });
  }, [paramDot]);

  useEffect(() => {
    if (listBuildingEnable.length > 0) {
      let fistBuilding = listBuildingEnable[0];
      setBuilding(fistBuilding.id);
    }
  }, [listBuildingEnable]);

  useEffect(() => {
    if (listFloorEnable.length > 0) {
      if (searchDot) {
        let indexFloor = listFloorEnable.findIndex(
          (ele) => ele.id === paramDot.floorId
        );
        if (indexFloor !== -1) {
          setSearchDot(false);
          onChangeBackround(listFloorEnable[indexFloor].backgroundFloor);
        }
      } else {
        let fistFloor = listFloorEnable[0];
        onChangeBackround(fistFloor.backgroundFloor);
        setParamDot({
          ...paramDot,
          floorId: fistFloor.id,
        });
      }
    }
  }, [listFloorEnable]);

  useEffect(() => {
    let listDot = dots.filter((ele) => checkedList.includes(ele.id));
    setListDot(listDot);
    setTicketParam({
      ...ticketParam,
      dotIds: listDot.map((ele) => ele.id),
    });
  }, [checkedList, dots]);

  const selectGroupHandle = (value) => {
    if (value !== "") {
      let groupIdx = listGroupDepartment.findIndex((ele) => ele.name === value);
      setListDepartment(listGroupDepartment[groupIdx].listChild || []);
      setParamDot({
        ...paramDot,
        department:
          listGroupDepartment[groupIdx]?.listChild?.sort((a, b) =>
            a.name.localeCompare(b.name)
          )?.[0]?.name || "",
      });
      setGroup(value);
    }
  };
  const selectDepartmentHandle = (value) => {
    setParamDot({
      ...paramDot,
      department: value,
    });
  };
  const selectBuildingHandle = (value) => {
    getFloorEnableByBuildingIdDispatch(value);
    setBuilding(value);
    onClearSelectedDot();
    setFilterList({ value: [], isFilter: false });
  };

  const selectFloorHandle = (value) => {
    let floorIdx = listFloorEnable.findIndex((ele) => ele.id === value);
    onChangeBackround(listFloorEnable[floorIdx].backgroundFloor);
    setParamDot({
      ...paramDot,
      floorId: value,
    });
    onClearSelectedDot();
    setFilterList({ value: [], isFilter: false });
  };

  const changeDateHandle = (val) => {
    if (typeSelect === "view") {
      console.log(val);
      setParamDot({
        ...paramDot,
        date: val.format("YYYY-MM-DD"),
      });
    } else {
      setParamDot({
        ...paramDot,
        fromDate: val[0].format("YYYY-MM-DD"),
        toDate: val[1].format("YYYY-MM-DD"),
      });
    }
  };

  const handlePushTicket = () => {
    if (ticketParam.dotIds.length > 0) {
      let totalPrice = listDot.reduce((total, item) => total + item.price, 0);
      let totalPriceStr = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(totalPrice);
      confirm({
        title: `${t("office.titleTicket")} ${ticketParam.type}`,
        icon: <ExclamationCircleOutlined />,
        content: `${t("office.total")} ${totalPriceStr}`,
        okText: `${t("common.push")}`,
        cancelText: `${t("common.cancel")}`,
        okType: "primary",
        onOk() {
          createTicketDispatch(ticketParam);
        },
      });
    } else {
      notification.warning({
        message: "Warning",
        description: "Please select dot !",
      });
    }
  };

  const handleUpdateDot = () => {
    if (ticketParam.dotIds.length > 0) {
      confirm({
        title: `${t("setting.titleDelete")}`,
        icon: <ExclamationCircleOutlined />,
        content: `${t("office.contentDelete")}`,
        okText: `${t("common.confirm")}`,
        cancelText: `${t("common.cancel")}`,
        okType: "primary",
        okButtonProps: { danger: "true" },
        onOk() {
          updateDotListDispatch({
            id: ticketParam.dotIds,
            fromDate: listDot[0].fromDate,
            toDate: listDot[0].toDate,
            status: isAdmin() ? "available" : "allocated",
            screen: "map",
          });
          onClearSelectedDot();
        },
      });
    } else {
      notification.warning({
        message: "Warning",
        description: "Please select dot !",
      });
    }
  };

  const handleRangeChange = (val) => {
    setTicketParam({
      ...ticketParam,
      fromDate: val[0].format("YYYY-MM-DD"),
      toDate: val[1].format("YYYY-MM-DD"),
    });
  };
  const searchDotDispatch = useMemo(() => {
    return debounce((query) => {
      if (query) {
        dispatch(searchDotRequest({ query, date: paramDot.date }));
      }
    }, 300);
  }, []);

  const options = useMemo(() => {
    return [
      { label: "View", value: "view" },
      { label: "Book", value: "action" },
    ];
  });
  let changeTabHandler = async (e) => {
    setTypeSelect(e.target.value);
    onClearSelectedDot();
    setFilterList({ value: [], isFilter: false });
  };
  return (
    <>
      <div className="filter-wrapper" id="filter-wrapper">
        {!isMember() && (
          <div className="line">
            <Radio.Group
              options={options}
              className="full-width"
              onChange={changeTabHandler}
              value={typeSelect}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
        )}
        <div className="line">
          <Select
            placeholder={t("office.selectBuilding")}
            className="half-line"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ fontSize: 12 }}
            onChange={selectBuildingHandle}
            value={building}
          >
            {listBuildingEnable.map((building, key) => (
              <Option value={building.id} key={`${key}-building`}>
                {building.buildingName}
              </Option>
            ))}
          </Select>
          <Select
            placeholder={t("office.selectFloor")}
            className="half-line"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ fontSize: 12 }}
            onChange={selectFloorHandle}
            value={paramDot.floorId}
          >
            {listFloorEnable.map((floor, key) => (
              <Option value={floor.id} key={`${key}-floor`}>
                {floor.floorName}
              </Option>
            ))}
          </Select>
        </div>
        {typeSelect === "view" && (
          <div className="line">
            <Select
              disabled={paramDot.floorId === null}
              placeholder={t("office.selectGroup")}
              className="half-line"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ fontSize: 12 }}
              onChange={selectGroupHandle}
              value={group}
            >
              {listGroupDepartment
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((ele, key) => (
                  <Option value={ele.name} key={`${key}-group`}>
                    {ele.name}
                  </Option>
                ))}
            </Select>
            <Select
              disabled={paramDot.floorId === null}
              placeholder={t("office.selectDepartment")}
              className="half-line"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ fontSize: 12 }}
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
        )}
        <div className={`line ${typeSelect !== "view" && "no-margin-bottom"}`}>
          {typeSelect !== "view" ? (
            <RangePicker
              className="full-width"
              value={[
                moment(paramDot.fromDate, "YYYY-MM-DD"),
                moment(paramDot.toDate, "YYYY-MM-DD"),
              ]}
              onChange={changeDateHandle}
              placeholder={[
                `${t("office.startDate")}`,
                `${t("office.endDate")}`,
              ]}
              allowClear={false}
            />
          ) : (
            <DatePicker
              className="full-width"
              value={moment(paramDot.date, "YYYY-MM-DD")}
              onChange={changeDateHandle}
              allowClear={false}
            />
          )}
        </div>
        {typeSelect === "view" && (
          <div className="line no-margin-bottom">
            <Select
              showSearch
              style={{ width: "100%", fontSize: 12 }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={searchDotDispatch}
              value={ldap}
              placeholder={t("office.search")}
              onChange={(v) => {
                let data = listDotSearch[v];
                setParamDot({
                  ...paramDot,
                  floorId: data.floorId,
                  username: data.username,
                  department: data.department,
                });
                let groupSelect = listGroupDepartment?.find((e) =>
                  e.listChild?.find((i) => i.name === data.department)
                );
                setGroup(groupSelect ? groupSelect.name : group);
                setBuilding(null);
                selectBuildingHandle(data.buildingId);
                setSearchDot(true);
                setLdap(v);
              }}
              notFoundContent={null}
            >
              {listDotSearch.map((v, idx) => (
                <Option key={idx}>
                  <div
                    title={v.fullName}
                    style={{ width: "100%", fontSize: 12 }}
                  >
                    <div style={{ width: "100%" }}>{v.fullName}</div>
                    <div style={{ width: "100%" }}>
                      {v.buildingName} - {v.floorName}
                    </div>
                  </div>
                </Option>
              ))}
            </Select>
            <Tooltip placement="right" title={<span>Reset</span>}>
              <Button
                type="text"
                icon={<SyncOutlined />}
                onClick={() => {
                  setParamDot({
                    ...paramDot,
                    department: "",
                    username: "",
                    date: moment(new Date()).format("YYYY-MM-DD"),
                  });
                  setListDepartment([]);
                  setLdap(null);
                  setGroup(null);
                }}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <div
        className="list-wrapper"
        style={
          typeSelect !== "view"
            ? {
                maxHeight:
                  document.getElementById("root")?.offsetHeight -
                    document.getElementById("bottom")?.offsetHeight -
                    document.getElementById("filter-wrapper")?.offsetHeight -
                    NAV_HEIGHT -
                    PADDING_TOP_SCREEN || "auto",
              }
            : {}
        }
      >
        {listDot.map((item, key) => (
          <DotSelectedItem
            item={item}
            onUnselected={onUnselected}
            key={`${item.id}-${key}`}
          />
        ))}
      </div>
      {typeSelect !== "view" && (
        <div className="bottom" id="bottom">
          <table>
            <thead>
              <tr>
                <th style={{ width: "15%" }}>{t("office.pick")}</th>
                {/* <th style={{ width: "30%" }}>{t("office.status")}</th> */}
                <th style={{ width: "85%" }}>{t("office.timeRange")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{checkedList.length}</td>
                {/* <td>
                  <Select
                    value={ticketParam.type}
                    style={{ fontSize: 12 }}
                    onChange={(v) => {
                      setTicketParam({ ...ticketParam, type: v });
                      setTypeSelect(v);
                      onClearSelectedDot();
                    }}
                  >
                    {TYPE_SELECT(activities)?.map((ele, key) => (
                      <Option value={ele.value} key={key}>
                        {ele.title}
                      </Option>
                    ))}
                  </Select>
                </td> */}
                <td>
                  <RangePicker
                    style={{ width: "100%" }}
                    value={[
                      moment(ticketParam.fromDate, "YYYY-MM-DD"),
                      moment(ticketParam.toDate, "YYYY-MM-DD"),
                    ]}
                    disabledDate={(current) => {
                      return current && current < moment().subtract(1, "day");
                    }}
                    onChange={handleRangeChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="btn-wapper">
            <Button type={"text"} onClick={onClearSelectedDot}>
              {t("common.cancel")}
            </Button>
            <Button
              type="primary"
              onClick={
                ticketParam.type === "reclaim"
                  ? handleUpdateDot
                  : handlePushTicket
              }
            >
              {ticketParam.type === "reclaim" ? "Reclaim" : t("common.push")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Filter);
