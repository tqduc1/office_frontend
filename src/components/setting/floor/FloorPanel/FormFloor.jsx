import React, { memo, useEffect, useState } from "react";
import {
  PageHeader,
  Form,
  Input,
  Button,
  Select,
  Space,
  Divider,
  notification,
  Modal,
  InputNumber,
  Tooltip,
} from "antd";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FolderAddFilled } from "@ant-design/icons";
import { DragDropContainer } from "@Components/common/DragAndDrop";
import { getBuildingEnableRequest } from "@Actions/BuildingActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@Components/common/Loading";

function FormFloor({
  onCollapse,
  type,
  onOpenSelectImage,
  dots,
  file,
  onSubmit,
  floorUpdateData = null,
  deleteDots,
  isPreview,
}) {
  const { t } = useTranslation();
  let history = useHistory();
  const dispatch = useDispatch();
  const getBuildingDispatch = (param) =>
    dispatch(getBuildingEnableRequest(param));
  const goBackHandler = () => {
    history.goBack();
    onCollapse(false);
  };
  const [floorData, setFloorData] = useState({
    floorName: floorUpdateData?.floorName || "",
    buildingId: floorUpdateData?.buildingId || "",
    numberOfSeatDot: floorUpdateData?.numberOfSeatDot || 0,
    numberOfRoomDot: floorUpdateData?.numberOfRoomDot || 0,
    address: floorUpdateData?.address || "",
    cost: floorUpdateData?.cost || 0,
    dotPricePerMonth: floorUpdateData?.dotPricePerMonth || 0,
  });
  const { listBuildingEnable } = useSelector((state) => state.building);
  const { isLoading, isSuccessful } = useSelector((state) => state.floor);
  useEffect(() => {
    getBuildingDispatch();
    form.setFieldsValue({
      ...floorData,
    });
  }, []);
  const showSuccessModal = () => {
    Modal.success({
      title: "Sucesss",
      content:
        type === "edit" ? "Update Floor Success" : "Create Floor Success",
      onOk() {
        goBackHandler();
      },
    });
  };
  const onClickHandle = () => {
    if (
      !floorData.floorName.trim() ||
      !floorData.buildingId ||
      // !floorData.cost ||
      !floorData.dotPricePerMonth
    ) {
      return notification.warning({
        message: "Error",
        description: "Please enter all fields require !",
      });
    }
    if (!isPreview) {
      return notification.warning({
        message: "Error",
        description: "Please select background floor !",
      });
    }
    onSubmit(
      type === "edit"
        ? {
            id: floorUpdateData.id,
            backgroundFloor: floorUpdateData.backgroundFloor,
            file,
            dots,
            deleteDots,
            ...floorData,
            floorName: floorData.floorName.replace(/\s+/g, " ").trim(),
          }
        : {
            file,
            dots,
            ...floorData,
            floorName: floorData.floorName.replace(/\s+/g, " ").trim(),
          }
    );
    setFloorData({
      floorName: "",
      buildingId: "",
      numberOfSeatDot: 0,
      numberOfRoomDot: 0,
    });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    if (dots.length > 0) {
      let numberOfSeatDot = dots.filter((item) => item.type === "seat").length;
      form.setFieldsValue({
        numberOfSeatDot,
        numberOfRoomDot: dots.length - numberOfSeatDot,
      });
      setFloorData({
        ...floorData,
        numberOfSeatDot,
        numberOfRoomDot: dots.length - numberOfSeatDot,
      });
    }
  }, [dots]);
  return (
    <div className="floor-container-left">
      {isSuccessful && showSuccessModal()}
      <Loading loading={isLoading} />
      <PageHeader
        onBack={goBackHandler}
        title={
          type === "edit" ? t("setting.editFloor") : t("setting.createFloor")
        }
        style={{ padding: 0 }}
      />
      <Divider style={{ margin: "10px 0" }} />
      <Form
        layout="horizontal"
        onValuesChange={(_, v) => {
          setFloorData({
            floorName: v.floorName.replace(
              /[`~!@#$%^&*_|+/=?;:'"<>\{\}\[\]\\\/]/gi,
              ""
            ),
            buildingId: v.buildingId,
            numberOfSeatDot: v.numberOfSeatDot,
            numberOfRoomDot: v.numberOfRoomDot,
            cost: v.cost,
            dotPricePerMonth: v.dotPricePerMonth,
          });
          form.setFieldsValue({
            floorName: v.floorName.replace(
              /[`/~!@#$%^&*_|+=?;:'"<>\{\}\[\]\\\/]/gi,
              ""
            ),
            buildingId: v.buildingId,
            numberOfSeatDot: v.numberOfSeatDot,
            numberOfRoomDot: v.numberOfRoomDot,
            cost: v.cost,
            dotPricePerMonth: v.dotPricePerMonth,
          });
        }}
        labelCol={{
          flex: "35%",
        }}
        form={form}
        labelAlign="left"
        wrapperCol={{
          flex: "65%",
        }}
        autoComplete="true"
        className="form-floor"
        colon={false}
      >
        <Form.Item
          className="line"
          label={
            <label>
              {t("setting.name")} <span />
            </label>
          }
          name="floorName"
          rules={[
            { required: true, message: "Name is required!" },
            {
              pattern: new RegExp("[a-zA-Z0-9@.' ,-]"),
              message: "Name is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("setting.building")}
          name="buildingId"
          rules={[{ required: true, message: "Building is required!" }]}
        >
          <Select
            onChange={(value) => {
              let objIndex = listBuildingEnable.findIndex(
                (obj) => obj.id == value
              );
              form.setFieldsValue({
                address: listBuildingEnable[objIndex].buildingAddress,
              });
            }}
          >
            {listBuildingEnable
              .sort((a, b) => a.buildingName.localeCompare(b.buildingName))
              .map((ele, idx) => (
                <Select.Option key={idx} value={ele.id}>
                  {ele.buildingName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={t("setting.address")}
          name="address"
          rules={[{ required: true, message: "Address is required!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label={t("report.cost")}
          name="cost"
          // rules={[{ required: true, message: "Cost is required!" }]}
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label={
            <Tooltip title={"($/month/dot)"} placement={"right"}>
              {t("report.amount").split(" ")[0]}
            </Tooltip>
          }
          name="dotPricePerMonth"
          rules={[{ required: true, message: "Amount is required!" }]}
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
            min={0}
          />
        </Form.Item>

        <Form.Item label={t("setting.noSeatDot")} name="numberOfSeatDot">
          <Input disabled />
        </Form.Item>
        <Form.Item label={t("setting.noRoomDot")} name="numberOfRoomDot">
          <Input disabled />
        </Form.Item>
        <div className="line">
          <label>{t("setting.seatDot")}</label>
          <DragDropContainer
            dragData={{ type: "seat", status: "available", id: -1 }}
            targetKey="office"
          >
            <Button
              type="text"
              shape="circle"
              className="button-drag"
              icon={<div className="cicrle" />}
            />
          </DragDropContainer>
        </div>
        {/* <div className="line">
          <label>{t("setting.meetingRoomDot")}</label>
          <DragDropContainer
            dragData={{ type: "room", status: "available", id: -1 }}
            targetKey="office"
          >
            <Button
              type="text"
              shape="circle"
              className="button-drag"
              icon={<div className="square" />}
            />
          </DragDropContainer>
        </div> */}
        <div className="line">
          <label className="ant-form-item-required">
            {t("setting.backgroundFloor")}
          </label>
          <Button
            type="text"
            shape="circle"
            className="button-drag"
            icon={<FolderAddFilled />}
            onClick={onOpenSelectImage}
          />
        </div>
      </Form>
      <div className="group-btn">
        <Space>
          <Button type="text" onClick={goBackHandler}>
            {t("common.cancel")}
          </Button>
          <Button type="primary" onClick={onClickHandle}>
            {type === "edit" ? t("common.update") : t("common.create")}
          </Button>
        </Space>
      </div>
    </div>
  );
}
export default memo(FormFloor);
