import React, { useCallback, useEffect } from "react";
import { Radio } from "antd";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import OfficeList from "@Components/office/list/OfficeList";
import OfficeMap from "@Components/office/map/OfficeMap";
import Loading from "@Components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { resetGroupDepartment } from "../../actions/GroupDepartmentAction";

export default function Office({ permission }) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const resetGroupDepartmentDispatch = useCallback(
    async (param) => dispatch(resetGroupDepartment(param)),
    []
  );
  const options = [
    { label: "List", value: "list" },
    { label: "Map", value: "map" },
  ];
  let history = useHistory();
  let changeTabHandler = async (e) => {
    await resetGroupDepartmentDispatch();
    await history.replace(`${path}/${e.target.value}`);
  };
  const ticketStore = useSelector((state) => state.ticket);
  const { isLoading } = useSelector((state) => state.dot);
  const { isLoadingGroup } = useSelector((state) => state.groupDepartment);
  const buildingStore = useSelector((state) => state.building);
  useEffect(() => {
    return () => {
      resetGroupDepartmentDispatch();
    };
  }, []);

  return (
    <>
      <Loading
        loading={
          isLoading ||
          isLoadingGroup ||
          buildingStore.isLoading ||
          ticketStore.isLoading
        }
      />
      <div className="office-container">
        <div className="group-btn">
          <Radio.Group
            options={options}
            onChange={changeTabHandler}
            value={window.location.pathname.slice(8)}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
        <div className="office-wrapper">
          <Switch>
            <Route exact path={`${path}/`}>
              <Redirect to={`${path}/map`} />
            </Route>
            <Route
              path={`${path}/map`}
              children={
                <OfficeMap
                  activities={
                    permission?.filter((ele) => ele.key === `office/map`)?.[0]
                      ?.activities || []
                  }
                />
              }
            />
            <Route
              path={`${path}/list`}
              children={
                <OfficeList
                  activities={
                    permission?.filter((ele) => ele.key === `office/list`)?.[0]
                      ?.activities || []
                  }
                />
              }
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
