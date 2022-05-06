import { Tag } from "antd";
import React, { memo } from "react";
import { LIMIT } from "../../../../constants/common";
import { convertColor } from "../../../../services/common";

function DotRecord({ item, activePage, idx }) {
  return (
    <tr>
      <td style={{ width: "5%" }}>{LIMIT * (activePage - 1) + idx + 1}</td>
      <td style={{ width: "20%" }}>{item.group || "_"}</td>
      <td style={{ width: "10%" }}>{item.department || "_"}</td>
      <td style={{ width: "20%" }}>{item.buildingName || "_"}</td>
      <td style={{ width: "15%" }}>{item.floorName || "_"}</td>
      <td style={{ width: "15%" }}>{item.numberOfAllocatedDot}</td>
      <td style={{ width: "15%" }}>{item.numberOfOccupiedDot}</td>
    </tr>
  );
}
export default memo(DotRecord);
