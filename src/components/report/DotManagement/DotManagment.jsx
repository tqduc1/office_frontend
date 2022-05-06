import { Divider } from "antd";
import React, { memo, useCallback, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getBuildingEnableRequest } from "../../../actions/BuildingActions";
import {
  exportDotRequest,
  getDotReportRequest,
} from "../../../actions/DotAction";
import { getFloorEnableByBuildingIdRequest } from "../../../actions/FloorActions";
import {
  getGroupDepartmentRequest,
  resetGroupDepartment,
} from "../../../actions/GroupDepartmentAction";
import { LIMIT } from "../../../constants/common";
import Loading from "../../common/Loading";
import DotTable from "./DotTable/DotTable";
import FilterDotManagement from "./FilterDotManagement";

function DotManagment() {
  const dispatch = useDispatch();
  const getGroupDepartmentDispatch = useCallback(
    (param) => dispatch(getGroupDepartmentRequest(param)),
    []
  );
  const resetGroupDepartmentDispatch = useCallback(
    (param) => dispatch(resetGroupDepartment(param)),
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
  const getDotReportDispatch = useCallback(
    (param) => dispatch(getDotReportRequest(param)),
    []
  );
  const exportDotDispatch = useCallback(
    (param) => dispatch(exportDotRequest(param)),
    []
  );

  useEffect(() => {
    getDotReportDispatch({
      buildingId: "",
      floorIds: [],
      department: "",
      username: "",
      exportDate: moment().format("YYYY-MM-DD"),
      status: [],
      page: 1,
      size: LIMIT,
    });
    getBuildingDispatch();
    getGroupDepartmentDispatch();
    return () => {
      resetGroupDepartmentDispatch();
    };
  }, []);

  const { isLoading, downloading, listData, activePage, totalItem, paramGet } =
    useSelector((state) => state.report);
  const { isLoadingGroup, listGroupDepartment } = useSelector(
    (state) => state.groupDepartment
  );
  const buildingStore = useSelector((state) => state.building);
  const floorStore = useSelector((state) => state.floor);

  return (
    <div className="dot-management">
      <Loading
        loading={
          downloading || isLoading || isLoadingGroup || buildingStore.isLoading
        }
        exportLoader={downloading}
      />
      <FilterDotManagement
        onSubmit={getDotReportDispatch}
        getFloorEnableByBuildingIdDispatch={getFloorEnableByBuildingIdDispatch}
        listBuildingEnable={buildingStore.listBuildingEnable}
        listFloorEnable={floorStore.listFloorEnable}
        listGroupDepartment={listGroupDepartment}
        onExport={exportDotDispatch}
      />
      <Divider />
      <DotTable
        listDot={listData}
        activePage={activePage}
        totalItem={totalItem}
        paramGet={paramGet}
        getDotReportDispatch={getDotReportDispatch}
      />
    </div>
  );
}

export default memo(DotManagment);
