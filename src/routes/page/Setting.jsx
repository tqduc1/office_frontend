import React, { useMemo, useState } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import BuildingSetting from "@Components/setting/building/BuildingSetting";
import FloorSetting from "@Components/setting/floor/FloorSetting";
import EditFloor from "@Components/setting/floor/EditFloor";
import CreateFloor from "@Components/setting/floor/CreateFloor";
import MenuSetting from "@Components/setting/MenuSetting";

export default function Setting() {
  const [isCollapsed, setCollapse] = useState(
    window.matchMedia("(max-width: 1020px)").matches
  );
  const { path } = useRouteMatch();
  let collapse = useMemo(() => {
    return window.matchMedia("(max-width: 600px)").matches ? true : isCollapsed;
  }, [isCollapsed]);
  return (
    <div className={`setting-container`}>
      <MenuSetting collapsed={collapse} onCollapse={setCollapse} />
      <div className={collapse ? `right collapsed` : `right`}>
        <Switch>
          <Route exact path={`${path}/`}>
            <Redirect to={`${path}/building`} />
          </Route>
          <Route path={`${path}/building`} children={<BuildingSetting />} />
          <Route path={`${path}/floor`} children={<FloorSetting />} />
          <Route
            path={`${path}/floor-detail`}
            children={<EditFloor onCollapse={setCollapse} />}
          />
          <Route
            path={`${path}/create-floor`}
            children={<CreateFloor onCollapse={setCollapse} />}
          />
        </Switch>
      </div>
    </div>
  );
}
