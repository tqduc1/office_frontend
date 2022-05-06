import { Card } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, useRouteMatch, useHistory } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Metting, MotoTicket, OfficeChair } from "../../assets/image";
import DotManagment from "../../components/report/DotManagement/DotManagment";

export default function Report() {
  const { path } = useRouteMatch();
  let history = useHistory();
  let changeTabHandler = (subPath) => {
    history.replace(`${path}/${subPath}`);
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="report-container">
        <Switch>
          <Route
            exact
            path={`${path}/`}
            children={
              <div className="export-options">
                <Card
                  hoverable
                  className="item"
                  onClick={() => changeTabHandler("dot-management")}
                >
                  <img
                    alt="Dot management"
                    className="image-options"
                    src={OfficeChair}
                  />
                  <span>{t("common.dotManagement")}</span>
                </Card>
                <Card
                  hoverable
                  className="item"
                  // onClick={() => changeTabHandler("meeting-management")}
                >
                  <img
                    alt="Dot management"
                    className="image-options"
                    src={Metting}
                  />
                  <span>{t("common.mettingManagement")}</span>
                </Card>
                <Card
                  hoverable
                  className="item"
                  // onClick={() => changeTabHandler("moto-ticket-management")}
                >
                  <img
                    alt="Dot management"
                    className="image-options"
                    src={MotoTicket}
                  />
                  <span>{t("common.motoTicketManagement")}</span>
                </Card>
              </div>
            }
          />

          <Route
            path={`${path}/dot-management`}
            children={
              <DotManagment
              // activities={
              //   permission?.filter((ele) => ele.key === `office/list`)?.[0]
              //     ?.activities || []
              // }
              />
            }
          />
        </Switch>
      </div>
    </>
  );
}
