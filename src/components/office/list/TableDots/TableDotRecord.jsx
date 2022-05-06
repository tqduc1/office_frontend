import React, { memo, useState } from "react";
import {
  Checkbox,
  Switch,
  Tag,
  Button,
  Popover,
  DatePicker,
  Select,
  Modal,
  Input,
} from "antd";
import { convertColor } from "@Services/common";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { Option } = Select;
import { useTranslation } from "react-i18next";
import { DOT_FILTER } from "@Constants/common";
import { useDispatch } from "react-redux";
import { deleteDotListRequest } from "@Actions/DotAction";
import moment from "moment";
import { formatDate } from "@Services/common";
import SwapDot from "../SwapDot";
import {
  checkPermission,
  isAdmin,
  isAdminOrDuLead,
  isDuLead,
} from "../../../../services/common";
import { getStorage } from "../../../../http";
const { confirm } = Modal;

function TableDotRecord({
  record,
  activities,
  updateDotListDispatch,
  assignDotDispatch,
  activeDotListDispatch,
}) {
  const [edit, setEdit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [updateParam, setUpdateParam] = useState({
    fromDate: formatDate(new Date()),
    toDate: formatDate(new Date()),
    status: record.status?.toLowerCase(),
  });

  const [assignParam, setAssignParam] = useState({
    username: "",
    status: record.status?.toLowerCase(),
    screen: "list",
  });
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const deleteDotDispatch = (id) => {
    dispatch(deleteDotListRequest(id));
  };
  const handleSelect = (val) => {
    isAdmin()
      ? setUpdateParam({ ...updateParam, status: val })
      : setAssignParam({ ...assignParam, status: val });
  };
  const handleUpdateDot = () => {
    if (isAdmin()) {
      updateDotListDispatch({
        id: [record.id],
        ...updateParam,
      });
    } else {
      assignDotDispatch({
        id: record.id,
        ...assignParam,
      });
    }
    setEdit(false);
    setVisible(false);
  };
  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };
  const showDeleteConfirm = (record) => {
    confirm({
      title: `${t("setting.titleDelete")}`,
      icon: <ExclamationCircleOutlined />,
      content: `${t("office.contentDelete")}`,
      okText: `${t("common.confirm")}`,
      cancelText: `${t("common.cancel")}`,
      okType: "primary",
      okButtonProps: { danger: "true" },
      onOk() {
        deleteDotDispatch(record.id);
        setVisible(false);
      },
    });
  };
  // const renderSwapDot = () => {
  //   if (record.status === "occupied") {
  //     if (isAdmin()) {
  //       return <SwapDot record={record} setVisible={setVisible} />;
  //     } else if (isDuLead && getStorage("department") === record.department) {
  //       return <SwapDot record={record} setVisible={setVisible} />;
  //     }
  //   }
  // };
  const renderCheckbox = () => {
    if (
      isAdmin() ||
      (isDuLead() && getStorage("department") === record.department)
    ) {
      return <Checkbox value={record} />;
    }
  };
  const renderActions = () => {
    if (
      checkPermission(activities, "delete") ||
      checkPermission(activities, "edit") ||
      checkPermission(activities, "swap-dot")
    ) {
      return (
        <td style={{ width: "7%" }}>
          {edit ? (
            <>
              <Button
                type="text"
                icon={<CheckOutlined />}
                onClick={handleUpdateDot}
              />
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setEdit(false)}
              />
            </>
          ) : (
            <Popover
              placement="bottomLeft"
              className="action-button"
              content={
                <div className="dropdown-menu">
                  {/* {renderSwapDot()} */}

                  {/* {checkPermission(activities, "edit") && (
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => {
                        setEdit(true);
                        isAdmin()
                          ? setUpdateParam({
                              ...updateParam,
                              fromDate:
                                record.fromDate || formatDate(new Date()),
                              toDate: record.toDate || formatDate(new Date()),
                              status: record.status?.toLowerCase(),
                            })
                          : setAssignParam({
                              ...assignParam,
                              username: record.username,
                              status: record.status?.toLowerCase(),
                            });
                      }}
                    >
                      {t("common.edit")}
                    </Button>
                  )} */}
                  {checkPermission(activities, "delete") && (
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        showDeleteConfirm(record);
                      }}
                    >
                      {t("common.delete")}
                    </Button>
                  )}
                </div>
              }
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
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
      );
    }
  };
  return (
    <tr>
      <td style={{ width: "2%" }}>{renderCheckbox()}</td>
      <td style={{ width: "15%" }}>{record.owner || "_"}</td>
      <td style={{ width: "15%" }}>{record.fullName || "_"}</td>
      <td style={{ width: "5%" }}>
        {edit && isDuLead() ? (
          <Input
            value={assignParam.username}
            onChange={(e) =>
              setAssignParam({
                ...assignParam,
                username: e.target.value.trim(),
              })
            }
          />
        ) : (
          record.username || "_"
        )}
      </td>
      <td style={{ width: "10%" }}>{record.buildingName || "_"}</td>
      <td style={{ width: "7%" }}>{record.floorName || "_"}</td>
      <td style={{ width: "5%" }}>{record.group || "_"}</td>
      <td style={{ width: "5%" }}>{record.department || "_"}</td>
      <td style={{ width: "7%", padding: 0 }}>
        {edit && isAdmin() ? (
          <DatePicker
            value={moment(updateParam.fromDate, "YYYY-MM-DD")}
            allowClear={false}
            onChange={(v) =>
              setUpdateParam({
                ...updateParam,
                fromDate: v.format("YYYY-MM-DD"),
              })
            }
          />
        ) : (
          record.fromDate || "_"
        )}
      </td>
      <td style={{ width: "7%", padding: 0 }}>
        {edit && isAdmin() ? (
          <DatePicker
            value={moment(updateParam.toDate, "YYYY-MM-DD")}
            allowClear={false}
            onChange={(v) =>
              setUpdateParam({
                ...updateParam,
                toDate: v.format("YYYY-MM-DD"),
              })
            }
          />
        ) : (
          record.toDate || "_"
        )}
      </td>
      <td style={{ width: "9%" }}>
        {edit ? (
          <Select
            allowClear
            showSearch
            style={{ fontSize: 12, width: "100%" }}
            value={
              isAdmin() ? updateParam.status?.toLowerCase() : assignParam.status
            }
            onChange={handleSelect}
          >
            {isAdmin()
              ? DOT_FILTER.map((ele, key) => (
                  <Option value={ele.value} key={key}>
                    {ele.title}
                  </Option>
                ))
              : DOT_FILTER.slice(1).map((ele, key) => (
                  <Option value={ele.value} key={key}>
                    {ele.title}
                  </Option>
                ))}
          </Select>
        ) : (
          <Tag
            color={convertColor(record.status?.toLowerCase())}
            style={{
              width: 85,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {record.status?.toUpperCase()}
          </Tag>
        )}
      </td>
      {checkPermission(activities, "enable") && (
        <td style={{ width: "6%" }}>
          <Switch
            checked={record.isActive}
            size="small"
            onChange={() => activeDotListDispatch(record.id)}
          />
        </td>
      )}
      {renderActions()}
    </tr>
  );
}
export default memo(TableDotRecord);
