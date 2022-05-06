import React, { useEffect, useState } from "react";
import * as routes from "./page/index";
import { Route, Switch, Redirect } from "react-router-dom";
import Nav from "@Components/common/Nav";
import { useTranslation } from "react-i18next";
import { uniqBy } from "../services/common";
import { getStorage } from "../http";

export default function UserInterface() {
  const { t } = useTranslation();
  const [router, setRouter] = useState([
    {
      subPath: "office",
      name: `${t("nav.office")}`,
      component: withContentContainer(routes.Office),
    },
    {
      subPath: "ticket",
      name: `${t("nav.ticket")}`,
      component: withContentContainer(routes.Ticket),
    },
  ]);
  const [mainPermission, setMainPermission] = useState([]);
  useEffect(() => {
    let permission = getStorage("user")?.permissions;
    if (permission) {
      let mainUrl = uniqBy(
        permission.map((ele) => ele.key.split("/")[0]),
        JSON.stringify
      );
      let routerPermission = [
        mainUrl.includes("office") && {
          subPath: "office",
          name: `${t("nav.office")}`,
          component: withContentContainer(routes.Office),
        },
        mainUrl.includes("setting") && {
          subPath: "setting",
          name: `${t("nav.setting")}`,
          component: withContentContainer(routes.Setting),
        },
        mainUrl.includes("report") && {
          subPath: "report",
          name: `${t("nav.report")}`,
          component: withContentContainer(routes.Report),
        },
        mainUrl.includes("ticket") && {
          subPath: "ticket",
          name: `${t("nav.ticket")}`,
          component: withContentContainer(routes.Ticket),
        },
      ].filter(Boolean);
      setRouter(routerPermission);
      setMainPermission(permission);
    }
  }, []);
  console.log("ok");
  return (
    <div className={"dashboard"}>
      <Nav router={router} />
      <div className={"layout-container main"}>
        <Switch>
          <Route exact path={`/`}>
            <Redirect to={`/office`} />
          </Route>
          {!router
            ? null
            : router.map((route, idx) => (
                <Route
                  key={`route-${idx}`}
                  path={`/${route.subPath || ""}`}
                  children={<route.component permission={mainPermission} />}
                />
              ))}

          <Route>
            <Redirect to={`/office`} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

const withContentContainer = (Component) => (props) =>
  (
    <div className={"screen"}>
      <Component {...props} />
    </div>
  );
