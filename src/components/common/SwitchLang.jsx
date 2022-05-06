import React from "react";
import { Select } from "antd";
const { Option } = Select;
import { CaretDownOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "@Actions/LangActions";

export default function SwitchLang() {
  const dispatch = useDispatch();
  const langReducer = useSelector((state) => state.langReducer);
  const language = langReducer ? langReducer.language : "en";
  const lang = localStorage.getItem("i18nextLng") || language;
  const { i18n } = useTranslation();

  const handleChange = (value) => {
    dispatch(changeLanguage(value));
    i18n.changeLanguage(value);
  };
  return (
    <div className="switch-lang">
      <Select
        defaultValue={lang === "en-US" ? "en" : lang}
        onChange={handleChange}
        bordered={false}
        style={{ fontSize: 12, width: 100 }}
        suffixIcon={<CaretDownOutlined />}
      >
        <Option value={"en"}>English</Option>
        {/* <Option value="jp">日本語</Option>
        <Option value="ko">한국어</Option> */}
        <Option value="vi">Tiếng Việt</Option>
      </Select>
    </div>
  );
}
