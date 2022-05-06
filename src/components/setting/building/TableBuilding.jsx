import React, { useState, useMemo, memo, useCallback } from "react";
import {
  Button,
  Table,
  Switch,
  Space,
  Modal,
  Popconfirm,
  Form,
  Tooltip,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import EditableCell from "@Components/common/EditableCell";
const { confirm } = Modal;
import { useTranslation } from "react-i18next";
import { ASC_SORT, DESC_SORT, LIMIT } from "@Constants/common";
import { onEnterEvent } from "../../../services/common";

function TableBuilding(props) {
  const {
    listBuilding,
    totalItem,
    activePage,
    textSearch,
    getBuildingDispatch,
    searchBuildingDispatch,
    updateBuildingDispatch,
    deleteBuildingDispatch,
    deleteMultipleBuildingDispatch,
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const isEditing = (record) => record.key === editingKey;

  const showDeleteConfirm = (record) => {
    confirm({
      title: `${t("setting.titleDelete")}`,
      icon: <ExclamationCircleOutlined />,
      content: `${t("setting.contentDeleteBuilding")}`,
      okText: `${t("common.confirm")}`,
      cancelText: `${t("common.cancel")}`,
      okType: "primary",
      okButtonProps: { danger: "true" },
      onOk() {
        deleteBuildingDispatch(record.id);
        setSelectedRow([]);
        setSelectedRowKey([]);
      },
    });
  };

  const filterAction = () => ({
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Popconfirm
          title={t("setting.titleDelete")}
          disabled={selectedRow.length === 0}
          onConfirm={() => {
            deleteMultipleBuildingDispatch({ buildingIds: selectedRow });
            setSelectedRow([]);
            setSelectedRowKey([]);
            setFilterDropdownVisible(false);
          }}
          onCancel={() => {
            setSelectedRow([]);
            setSelectedRowKey([]);
            setFilterDropdownVisible(false);
          }}
          okText={t("common.delete")}
          cancelText={t("common.cancel")}
        >
          <Button
            block
            type={"text"}
            icon={<DeleteFilled />}
            disabled={selectedRow.length === 0}
          >
            {t("common.delete")}
          </Button>
        </Popconfirm>
      </div>
    ),
    filterIcon: () => <EllipsisOutlined style={{ color: "#000" }} />,
    filterDropdownVisible,
    onFilterDropdownVisibleChange: (visible) => {
      setFilterDropdownVisible(visible);
    },
  });

  const columns = [
    {
      title: t("setting.stt"),
      dataIndex: "key",
      key: "key",
      fixed: true,
      dataType: "string",
      width: "5%",
    },
    {
      title: t("setting.name"),
      dataIndex: "buildingName",
      key: "buildingName",
      width: "15%",
      editable: true,
      dataType: "string",
      sorter: true,
      render: (buildingName) => (
        <Tooltip placement="right" title={buildingName}>
          <span>{buildingName}</span>
        </Tooltip>
      ),
    },
    {
      title: t("setting.address"),
      dataIndex: "buildingAddress",
      key: "buildingAddress",
      width: "20%",
      editable: true,
      dataType: "string",
      sorter: true,
      render: (buildingAddress) => (
        <Tooltip placement="right" title={buildingAddress}>
          <span>{buildingAddress}</span>
        </Tooltip>
      ),
    },
    {
      title: t("setting.noFloor"),
      key: "numberOfFloor",
      dataIndex: "numberOfFloor",
      dataType: "number",
      sorter: true,
    },
    {
      title: t("setting.noRoomDot"),
      key: "numberOfRoomDot",
      dataIndex: "numberOfRoomDot",
      dataType: "number",
      width: "12%",
      sorter: true,
    },
    {
      title: t("setting.noSeatDot"),
      key: "numberOfSeatDot",
      dataIndex: "numberOfSeatDot",
      dataType: "number",
      sorter: true,
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
        <Tooltip
          placement="right"
          title={String(price || 0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        >
          <span>
            {String(price || 0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </Tooltip>
      ),
    },
    {
      title: t("common.enable"),
      key: "enable",
      width: "8%",
      render: (_, record) => (
        <Switch
          defaultChecked={record.isEnable}
          size="small"
          onChange={(checked) => {
            updateBuildingDispatch({ ...record, isEnable: checked });
          }}
        />
      ),
    },
    {
      title: t("common.action"),
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Button
              type="text"
              icon={<CheckOutlined />}
              onClick={() => save(record.key)}
            />
            <Button type="text" icon={<CloseOutlined />} onClick={cancel} />
          </Space>
        ) : (
          <Space size="middle">
            <Button
              type="text"
              icon={<DeleteFilled />}
              disabled={editingKey !== ""}
              onClick={() => showDeleteConfirm(record)}
            />
            <Button
              type="text"
              icon={<EditFilled />}
              onClick={() => edit(record)}
            />
          </Space>
        );
      },
      ...filterAction(),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        onSave: () => save(record.key),
      }),
    };
  });

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = useCallback(
    async (key) => {
      try {
        const row = await form.validateFields();
        const keyData = key - 1 - LIMIT * (activePage - 1);
        updateBuildingDispatch({
          buildingName: row.buildingName.replace(/\s+/g, " ").trim(),
          buildingAddress: row.buildingAddress.replace(/\s+/g, " ").trim(),
          id: data[keyData].id,
          isEnable: data[keyData].isEnable,
        });
        setEditingKey("");
      } catch (errInfo) {
        return;
      }
    },
    [editingKey]
  );

  const data = useMemo(
    () =>
      listBuilding?.map((ele, idx) => ({
        ...ele,
        key: LIMIT * (activePage - 1) + idx + 1,
      })),
    [listBuilding]
  );

  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRowKey,
    onChange: (selectedRowKeys, selectedRows) => {
      let ids = selectedRows.map((ele) => ele.id);
      setSelectedRow(ids);
      setSelectedRowKey(selectedRowKeys);
    },
  };

  const handlePagination = (pagination, _, sorter) => {
    if (textSearch) {
      searchBuildingDispatch({
        page: pagination.current,
        size: LIMIT,
        buildingName: textSearch,
        sort: sorter.column?.dataIndex || "id",
        order: sorter.order === "ascend" ? ASC_SORT : DESC_SORT,
      });
    } else {
      getBuildingDispatch({
        page: pagination.current,
        size: LIMIT,
        sort: sorter.column?.dataIndex || "id",
        order: sorter.order === "ascend" ? ASC_SORT : DESC_SORT,
      });
    }
  };
  return (
    <div className="list-body">
      <Form form={form} component={false}>
        <Table
          className="table"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          scroll={{
            x: 1000,
            y:
              screen.width === 1920
                ? (screen.height * 60) / 100
                : (screen.height * 52) / 100,
          }}
          columns={mergedColumns}
          dataSource={data}
          size="small"
          pagination={{
            current: activePage,
            pageSize: LIMIT,
            total: totalItem,
            position: ["bottomCenter"],
          }}
          onChange={handlePagination}
        />
        <div className="number-record">
          {t("common.thisPage")}{" "}
          <span style={{ fontWeight: "600" }}>
            {data.length} / {totalItem}
          </span>{" "}
          {t("common.record")}.
        </div>
      </Form>
    </div>
  );
}

export default memo(TableBuilding);
