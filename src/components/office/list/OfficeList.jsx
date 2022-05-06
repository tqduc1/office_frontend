import React, { memo, useCallback, useEffect, useState } from "react";
import FilterList from "../../common/FilterList";
import { Divider } from "antd";
import TableDots from "./TableDots/TableDots";
import { useDispatch, useSelector } from "react-redux";
import { getDotListRequest } from "@Actions/DotAction";
import { LIMIT } from "@Constants/common";
import { getGroupDepartmentRequest } from "@Actions/GroupDepartmentAction";
import FormEdit from "./FormEdit";
import { getBuildingEnableRequest } from "@Actions/BuildingActions";
import { getFloorEnableByBuildingIdRequest } from "@Actions/FloorActions";
import {
  activeDotRequest,
  updateDotListRequest,
  updateDotMapRequest,
} from "../../../actions/DotAction";
import {
  checkPermission,
  isAdmin,
  isAdminOrDuLead,
  isMember,
} from "../../../services/common";
import { getStorage } from "../../../http";

function OfficeList({ activities }) {
  const dispatch = useDispatch();
  const [dotSelected, setDotSelected] = useState([]);
  const [isCheckedAll, setCheckedAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const getDotListDispatch = useCallback(
    (param) => dispatch(getDotListRequest(param)),
    []
  );

  const getGroupDepartmentDispatch = useCallback(
    (param) => dispatch(getGroupDepartmentRequest(param)),
    []
  );

  const getBuildingDispatch = useCallback(
    (param) => dispatch(getBuildingEnableRequest(param)),
    []
  );

  const getFloorEnableByBuildingIdDispatch = useCallback(
    (param) => dispatch(getFloorEnableByBuildingIdRequest(param)),
    []
  );

  const updateDotListDispatch = useCallback(
    (param) => dispatch(updateDotListRequest(param)),
    []
  );
  const activeDotListDispatch = useCallback(
    (param) => dispatch(activeDotRequest(param)),
    []
  );
  const assignDotDispatch = useCallback(
    (param) => dispatch(updateDotMapRequest(param)),
    []
  );

  useEffect(() => {
    getDotListDispatch({
      floorIds: [],
      department: !isAdmin() ? getStorage("department") : "",
      username: "",
      status: [],
      fromDate: "",
      toDate: "",
      page: 1,
      size: LIMIT,
    });
    getBuildingDispatch();
    getGroupDepartmentDispatch();
  }, []);
  const { listDot, activePage, totalItem, paramGet } = useSelector(
    (state) => state.dot
  );
  const { listBuildingEnable } = useSelector((state) => state.building);
  const { listFloorEnable } = useSelector((state) => state.floor);
  const { listGroupDepartment } = useSelector((state) => state.groupDepartment);
  return (
    <div className="office-list-wrapper">
      <FilterList
        onSubmit={getDotListDispatch}
        getFloorEnableByBuildingIdDispatch={getFloorEnableByBuildingIdDispatch}
        listBuildingEnable={listBuildingEnable}
        listFloorEnable={listFloorEnable}
        listGroupDepartment={listGroupDepartment}
      />
      <Divider />
      <TableDots
        listDot={listDot}
        activePage={activePage}
        totalItem={totalItem}
        paramGet={paramGet}
        getDotListDispatch={getDotListDispatch}
        setDotSelected={setDotSelected}
        dotSelected={dotSelected}
        isCheckedAll={isCheckedAll}
        setCheckedAll={setCheckedAll}
        indeterminate={indeterminate}
        setIndeterminate={setIndeterminate}
        updateDotListDispatch={updateDotListDispatch}
        assignDotDispatch={assignDotDispatch}
        activeDotListDispatch={activeDotListDispatch}
        activities={activities}
      />
      <Divider />
      {checkPermission(activities, "reclaim-ticket") && (
        <FormEdit
          dotSelected={dotSelected}
          setDotSelected={setDotSelected}
          setCheckedAll={setCheckedAll}
          setIndeterminate={setIndeterminate}
          updateDotListDispatch={updateDotListDispatch}
        />
      )}
    </div>
  );
}

export default memo(OfficeList);
