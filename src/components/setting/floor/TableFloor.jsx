import React, { memo, useMemo, useState } from "react";
import { Button, Table, Switch, Space, Modal, Popconfirm, Tooltip } from "antd";
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { confirm } = Modal;
import { useTranslation } from "react-i18next";
import { ASC_SORT, DESC_SORT, LIMIT } from "@Constants/common";

function TableFloor({
  listFloor,
  totalItem,
  activePage,
  textSearch,
  deleteFloorDispatch,
  getFloorDispatch,
  searchFloorDispatch,
  deleteMultipleFloorDispatch,
  updateEnableFloorDispatch,
}) {
  const { t } = useTranslation();
  // const [selectedRow, setSelectedRow] = useState([]);
  const showDeleteConfirm = (record) => {
    confirm({
      title: `${t("setting.titleDelete")}`,
      icon: <ExclamationCircleOutlined />,
      content: `${t("setting.contentDeleteFloor")}`,
      okText: `${t("common.confirm")}`,
      cancelText: `${t("common.cancel")}`,
      okType: "primary",
      okButtonProps: { danger: "true" },
      onOk() {
        deleteFloorDispatch(record.id);
      },
    });
  };

  // const filterAction = () => ({
  //   filterDropdown: () => (
  //     <div style={{ padding: 8 }}>
  //       <Popconfirm
  //         title="Sure to delete?"
  //         disabled={selectedRow.length === 0}
  //         onConfirm={() =>
  //           deleteMultipleFloorDispatch({ buildingIds: selectedRow })
  //         }
  //       >
  //         <Button
  //           block
  //           type={"text"}
  //           icon={<DeleteFilled />}
  //           disabled={selectedRow.length === 0}
  //         >
  //           Delete
  //         </Button>
  //       </Popconfirm>
  //     </div>
  //   ),
  //   filterIcon: () => <EllipsisOutlined style={{ color: "#000" }} />,
  // });

  const columns = [
    {
      title: t("setting.stt"),
      dataIndex: "key",
      key: "key",
      fixed: true,
      width: "4%",
    },
    {
      title: t("setting.name"),
      dataIndex: "floorName",
      key: "floorName",
      sorter: true,
      width: "15%",
      render: (floorName) => (
        <Tooltip placement="right" title={floorName}>
          <span>{floorName}</span>
        </Tooltip>
      ),
    },
    {
      title: t("setting.buildingName"),
      dataIndex: "buildingName",
      key: "buildingName",
      sorter: true,
      width: "15%",
      render: (buildingName) => (
        <Tooltip placement="right" title={buildingName}>
          <span>{buildingName}</span>
        </Tooltip>
      ),
    },
    {
      title: t("setting.address"),
      key: "address",
      dataIndex: "address",
      width: "20%",
      render: (address) => (
        <Tooltip placement="right" title={address}>
          <span>{address}</span>
        </Tooltip>
      ),
    },
    {
      title: t("setting.noRoomDot"),
      key: "numberOfRoomDot",
      dataIndex: "numberOfRoomDot",
      sorter: true,
      width: "8%",
    },
    {
      title: t("setting.noSeatDot"),
      key: "numberOfSeatDot",
      dataIndex: "numberOfSeatDot",
      sorter: true,
      width: "8%",
    },
    {
      title: t("report.cost"),
      key: "cost",
      dataIndex: "cost",
      sorter: true,
      render: (cost) => (
        <span>{String(cost || 0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      ),
    },
    {
      title: t("report.amount").split(" ")[0],
      key: "price",
      dataIndex: "price",
      sorter: true,
      render: (price) => (
        <span>{String(price || 0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      ),
    },
    {
      title: t("common.enable"),
      key: "enable",
      width: "5%",
      render: (_, record) => (
        <Switch
          defaultChecked={record.isEnable}
          size="small"
          onChange={(checked) => {
            updateEnableFloorDispatch({ ...record, isEnable: checked });
          }}
        />
      ),
    },
    {
      title: t("common.action"),
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<DeleteFilled />}
            onClick={() => showDeleteConfirm(record)}
          />
          <Link
            to={{ pathname: "/setting/floor-detail", state: { ...record } }}
          >
            <Button type="text" icon={<EditFilled />} />
          </Link>
        </Space>
      ),
      // ...filterAction(),
    },
  ];

  const data = useMemo(
    () =>
      listFloor?.map((ele, idx) => ({
        ...ele,
        key: LIMIT * (activePage - 1) + idx + 1,
      })),
    [listFloor]
  );
  // const rowSelection = {
  //   onChange: (_, selectedRows) => {
  //     let ids = selectedRows.map((ele) => ele.id);
  //     setSelectedRow(ids);
  //   },
  // };
  const handleChange = (pagination, _, sorter) => {
    if (textSearch) {
      searchFloorDispatch({
        page: pagination.current,
        size: LIMIT,
        floorName: textSearch,
        sort:
          sorter.column?.dataIndex === "buildingName"
            ? "buildingId"
            : sorter.column?.dataIndex || "id",
        order: sorter.order === "ascend" ? ASC_SORT : DESC_SORT,
      });
    } else {
      getFloorDispatch({
        page: pagination.current,
        size: LIMIT,
        sort:
          sorter.column?.dataIndex === "buildingName"
            ? "buildingId"
            : sorter.column?.dataIndex || "id",
        order: sorter.order === "ascend" ? ASC_SORT : DESC_SORT,
      });
    }
  };
  return (
    <div className="list-body">
      <Table
        className="table"
        columns={columns}
        // rowSelection={{
        //   type: "checkbox",
        //   ...rowSelection,
        // }}
        dataSource={data}
        scroll={{
          x: 1000,
          y:
            screen.width === 1920
              ? (screen.height * 60) / 100
              : (screen.height * 52) / 100,
        }}
        size="small"
        pagination={{
          current: activePage,
          pageSize: LIMIT,
          total: totalItem,
          position: ["bottomCenter"],
        }}
        onChange={handleChange}
      />

      <div className="number-record">
        {t("common.thisPage")}{" "}
        <span style={{ fontWeight: "600" }}>
          {data.length} / {totalItem}
        </span>{" "}
        {t("common.record")}.
      </div>
    </div>
  );
}

export default memo(TableFloor);
