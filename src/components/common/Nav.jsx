import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Popover, Button } from "antd";
import { CaretDownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Logo } from "@Assets/image";
import { Link, NavLink } from "react-router-dom";
import SwitchLang from "./SwitchLang";
import { useTranslation } from "react-i18next";
import { getStorage } from "../../http";
import { logoutHandle } from "../../services/common";

export default function Nav({ router }) {
  const { t } = useTranslation();
  const logout = async () => {
    logoutHandle();
  };
  const [avatar, setAvatar] = useState({
    color: "#f56a00",
    name: "",
  });
  let userData = useMemo(() => {
    return getStorage("user");
  }, []);
  console.log(userData);
  useEffect(() => {
    if (userData) {
      let firstName = userData.firstName?.charAt(0);
      let lastName = userData.lastName?.charAt(0);
      setAvatar({
        ...avatar,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        name: `${lastName}${firstName}`,
      });
    }
  }, []);

  const [activePath, setActivePath] = useState("");
  let getSubPath = window.location.pathname.slice(1);
  const renderMenu = router.map((ele, key) => (
    <NavLink
      to={`/${ele.subPath || ""}`}
      key={key}
      className={"link"}
      onClick={() => setActivePath(ele.subPath)}
      activeClassName={
        getSubPath.includes(ele.subPath) ||
        getSubPath.length === 0 ||
        activePath === ele.subPath
          ? "active"
          : null
      }
    >
      {t(`nav.${ele.subPath}`)}
    </NavLink>
  ));
  const content = (
    <div className="dropdown-menu">
      <Button type="text" icon={<LogoutOutlined />} onClick={logout}>
        {t("nav.logout")}
      </Button>
    </div>
  );
  return (
    <div className={"header"}>
      <div className="nav layout-container">
        <div className={"nav-left"}>
          <div className={"logo"}>
            <Link
              to="/"
              className="_row"
              onClick={() => setActivePath(router[0].subPath)}
            >
              <img src={Logo} />
            </Link>
          </div>
          <div className={"links"}>{renderMenu}</div>
        </div>
        <div className={"nav-right"}>
          <SwitchLang />
          <Popover placement="topRight" content={content} trigger="click">
            <div className="chip-avatar">
              <Avatar
                style={{
                  backgroundColor: avatar.color,
                  verticalAlign: "middle",
                }}
              >
                {avatar.name}
              </Avatar>
              <span className="user-info">{userData.fullName}</span>
              <CaretDownOutlined />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}
