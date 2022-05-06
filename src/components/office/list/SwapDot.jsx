import React, { useState, memo, useEffect, useMemo } from "react";
import {
  Modal,
  Button,
  Input,
  Form,
  notification,
  Select,
  Tooltip,
} from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { searchDotRequest, swapDotRequest } from "@Actions/DotAction";
const { Option } = Select;

function SwapDot({ record, setVisible }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dotSelect, setDotSelect] = useState("");
  const [swapParam, setSwapParam] = useState({
    idDot: "",
    idDotSwap: "",
  });
  const { t } = useTranslation();
  const showModal = () => {
    setVisible(false);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dispatch = useDispatch();
  const searchDotDispatch = useMemo(() => {
    return debounce((query) => {
      if (query) {
        dispatch(searchDotRequest({ query, date: record.fromDate }));
      }
    }, 300);
  }, []);
  const swapDotDispatch = (query) => dispatch(swapDotRequest(query));

  useEffect(() => {
    setSwapParam({
      ...swapParam,
      idDot: record.id,
    });
    return () => {
      searchDotDispatch.cancel();
    };
  }, []);
  const handleChange = (value) => {
    setSwapParam({
      ...swapParam,
      idDotSwap: listDotSearch[value]?.id,
    });
    setDotSelect(value);
  };
  const handleSwapDot = () => {
    if (!swapParam.idDot || !swapParam.idDotSwap) {
      notification.warning({
        message: "Error",
        description: "Please enter all fields require !",
      });
    } else {
      if (record.department === listDotSearch[dotSelect]?.department) {
        swapDotDispatch(swapParam);
        handleCancel();
      } else {
        notification.warning({
          message: "Error",
          description: "Not same Department !",
        });
      }
    }
  };
  const { listDotSearch } = useSelector((state) => state.dot);
  return (
    <>
      <Button type="text" icon={<SwapOutlined />} onClick={showModal}>
        {t("common.swap")}
      </Button>
      <Modal
        forceRender
        centered
        visible={isModalVisible}
        onOk={handleSwapDot}
        okText={t("common.swap")}
        cancelText={t("common.cancel")}
        onCancel={handleCancel}
        className="swap-dot"
      >
        <table>
          <thead>
            <tr>
              <th />
              <th>{t("office.owner")}</th>
              <th>{t("office.member")}</th>
              <th>{t("office.floor")}</th>
              <th>{t("office.building")}</th>
              <th>{t("office.department")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: "10%" }}>NOW</td>
              <td style={{ width: "35%" }}>{record.owner || "_"}</td>
              <td style={{ width: "10%" }}>
                <Tooltip
                  title={record.fullName || "-"}
                  style={{ width: "100%" }}
                >
                  <span style={{ width: "100%" }}>
                    {record.username || "-"}
                  </span>
                </Tooltip>
              </td>
              <td style={{ width: "15%" }}>{record.floorName || "_"}</td>
              <td style={{ width: "15%" }}>{record.buildingName || "_"}</td>
              <td style={{ width: "15%" }}>{record.department || "_"}</td>
            </tr>
            <tr>
              <td style={{ width: "10%" }}>NEW</td>
              <td style={{ width: "35%" }}>
                {listDotSearch[dotSelect]?.owner || "Auto Fill"}
              </td>
              <td style={{ width: "10%" }}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  value={dotSelect}
                  autoFocus
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={searchDotDispatch}
                  onChange={handleChange}
                  notFoundContent={null}
                >
                  {listDotSearch.map((v, idx) => (
                    <Option key={idx}>
                      <Tooltip title={v.fullName} style={{ width: "100%" }}>
                        <span style={{ width: "100%" }}>{v.username}</span>
                      </Tooltip>
                    </Option>
                  ))}
                </Select>
              </td>
              <td style={{ width: "15%" }}>
                {listDotSearch[dotSelect]?.floorName || "Auto Fill"}
              </td>
              <td style={{ width: "15%" }}>
                {listDotSearch[dotSelect]?.buildingName || "Auto Fill"}
              </td>
              <td style={{ width: "15%" }}>
                {listDotSearch[dotSelect]?.department || "Auto Fill"}
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </>
  );
}
export default memo(SwapDot);
