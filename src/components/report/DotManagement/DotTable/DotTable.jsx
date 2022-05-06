import React, { memo } from "react";
import { LIMIT } from "@Constants/common";
import PaginationCommon from "@Components/common/PaginationCommon";
import { useTranslation } from "react-i18next";
import DotRecord from "./DotRecord";

function DotTable({
  listDot,
  activePage,
  totalItem,
  paramGet,
  getDotReportDispatch,
}) {
  const { t } = useTranslation();

  const handlePagination = (pagination) => {
    getDotReportDispatch({
      ...paramGet,
      page: pagination,
      size: LIMIT,
    });
  };
  return (
    <div className="list-body">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>{t("report.stt")}</th>
              <th style={{ width: "20%" }}>{t("report.group")}</th>
              <th style={{ width: "10%" }}>{t("report.department")}</th>
              <th style={{ width: "20%" }}>{t("report.building")}</th>
              <th style={{ width: "15%" }}>{t("report.floor")}</th>
              <th style={{ width: "15%" }}>
                {t("report.numberOfAllocatedDot")}
              </th>
              <th style={{ width: "15%" }}>
                {t("report.numberOfOccupiedDot")}
              </th>
            </tr>
          </thead>
          <tbody className={screen.width === 1920 ? "body-sx" : ""}>
            {listDot.map((ele, idx) => (
              <DotRecord
                item={ele}
                activePage={activePage}
                key={idx}
                idx={idx}
              />
            ))}
          </tbody>
        </table>
      </div>
      <PaginationCommon
        page={activePage}
        size={LIMIT}
        count={listDot.length}
        totalItem={totalItem}
        onPagination={handlePagination}
      />
    </div>
  );
}

export default memo(DotTable);
