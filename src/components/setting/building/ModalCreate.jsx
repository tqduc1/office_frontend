import React, { useState, memo, useEffect } from "react";
import { Modal, Button, Input, Form, notification } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addBuildingRequest } from "@Actions/BuildingActions";
import { onEnterEvent } from "../../../services/common";

function ModalCreate() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addBuildingDispatch = (param) => dispatch(addBuildingRequest(param));
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [form] = Form.useForm();

  const handleAddBuiding = () => {
    if (!buildingData.buildingName || !buildingData.buildingAddress) {
      notification.warning({
        message: "Error",
        description: "Please enter all fields require !",
      });
    } else {
      addBuildingDispatch({
        buildingName: buildingData.buildingName.replace(/\s+/g, " ").trim(),
        buildingAddress: buildingData.buildingName.replace(/\s+/g, " ").trim(),
        isEnable: true,
      });
      form.setFieldsValue({
        buildingName: "",
        buildingAddress: "",
      });
      setBuildingData({
        buildingName: "",
        buildingAddress: "",
      });
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [buildingData, setBuildingData] = useState({
    buildingName: "",
    buildingAddress: "",
  });
  useEffect(() => {
    form.setFieldsValue({
      buildingName: "",
      buildingAddress: "",
    });
  }, []);
  return (
    <>
      <Button type="primary" onClick={showModal} icon={<PlusCircleOutlined />}>
        {t("common.create")}
      </Button>
      <Modal
        forceRender
        title={t("setting.titleCreateBuilding")}
        visible={isModalVisible}
        onOk={handleAddBuiding}
        okText={t("common.create")}
        cancelText={t("common.cancel")}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          form={form}
          onValuesChange={(_, v) => {
            setBuildingData({
              ...buildingData,
              buildingName: v.buildingName,
              buildingAddress: v.buildingAddress,
            });
            form.setFieldsValue({
              buildingName: v.buildingName.replace(
                /[`~!@#$%^&*_|+/=?;:'"<>\{\}\[\]\\\/]/gi,
                ""
              ),
              buildingAddress: v.buildingAddress.replace(
                /[`~!@#$%^&*_|+/=?;:'"<>\{\}\[\]\\\/]/gi,
                ""
              ),
            });
          }}
          onKeyDown={(e) => onEnterEvent(e, handleAddBuiding)}
          initialValues={buildingData}
        >
          <Form.Item
            label={t("setting.name")}
            name={"buildingName"}
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input
              name={"buildingName"}
              autoFocus
              value={buildingData.buildingName}
            />
          </Form.Item>
          <Form.Item
            label={t("setting.address")}
            name={"buildingAddress"}
            rules={[{ required: true, message: "Address is required!" }]}
          >
            <Input
              name={"buildingAddress"}
              value={buildingData.buildingAddress}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default memo(ModalCreate);
