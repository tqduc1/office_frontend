import React, { memo, useCallback, useEffect } from "react";
import FloorPanel from "./FloorPanel/FloorPanel";
import { useDispatch } from "react-redux";
import { addFloorRequest } from "@Actions/FloorActions";

function CreateFloor({ onCollapse }) {
  useEffect(() => {
    onCollapse(true);
  }, []);
  const dispatch = useDispatch();
  const createFloorDispatch = useCallback(
    (param) => dispatch(addFloorRequest(param)),
    []
  );

  return (
    <FloorPanel
      onCollapse={onCollapse}
      type={"create"}
      onSubmit={createFloorDispatch}
    />
  );
}
export default memo(CreateFloor);
