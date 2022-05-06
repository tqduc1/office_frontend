import React, { useEffect, memo, useCallback } from "react";
import FloorPanel from "./FloorPanel/FloorPanel";
import { updateFloorRequest } from "@Actions/FloorActions";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

function EditFloor(props) {
  const { onCollapse } = props;
  useEffect(() => {
    onCollapse(true);
  }, []);
  const dispatch = useDispatch();
  const updateFloorDispatch = useCallback(
    (param) => dispatch(updateFloorRequest(param)),
    []
  );
  let location = useLocation();
  return (
    <FloorPanel
      onCollapse={onCollapse}
      type={"edit"}
      floorData={location.state}
      onSubmit={updateFloorDispatch}
    />
  );
}

export default memo(EditFloor);
