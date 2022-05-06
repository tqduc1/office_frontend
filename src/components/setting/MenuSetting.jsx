import React, { memo, useMemo } from "react";
import { Menu } from "antd";
import {
  LayoutOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouteMatch, NavLink } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Building, Floor } from "../../assets/image";

function MenuSetting({ collapsed, onCollapse }) {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  const tabItem = [
    {
      path: `${path}/building`,
      name: `${t("setting.building")}`,
      icon: <img src={Building} width={"5%"} />,
    },
    {
      path: `${path}/floor`,
      name: `${t("setting.floor")}`,
      icon: <img src={Floor} width={"5%"} />,
    },
  ];
  let getSubPath = window.location.pathname;
  let collapse = useMemo(() => {
    return window.matchMedia("(max-width: 600px)").matches ? true : collapsed;
  }, [collapsed]);
  return (
    <Menu
      mode={"inline"}
      className={collapse ? `menu-setting collapsed` : `menu-setting`}
      inlineCollapsed={collapse}
      defaultSelectedKeys={
        getSubPath.length === 8 ? tabItem[0].path : getSubPath
      }
    >
      <Menu.Item
        className="menu-header"
        key={null}
        disabled
        icon={<SettingOutlined style={{ fontSize: "22px" }} />}
      >
        {collapsed ? "" : `${t("setting.setting")}`}
      </Menu.Item>
      {tabItem.map((tab) => (
        <Menu.Item
          key={tab.path}
          icon={tab.icon}
          onClick={() => onCollapse(false)}
          className={
            getSubPath.includes(tab.path) || getSubPath.length === 8
              ? "active"
              : null
          }
        >
          <NavLink to={tab.path}>{tab.name}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default memo(MenuSetting);
