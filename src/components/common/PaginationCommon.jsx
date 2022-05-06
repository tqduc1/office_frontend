import React from "react";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";

export default function PaginationCommon({
  page,
  size,
  count,
  totalItem,
  onPagination,
}) {
  const { t } = useTranslation();
  return (
    <div className="pagination">
      <Pagination
        size="small"
        current={page}
        pageSize={size}
        total={totalItem}
        showSizeChanger={false}
        onChange={onPagination}
      />
      <div className="number-record">
        {t("common.thisPage")}{" "}
        <span style={{ fontWeight: "600" }}>
          {count} / {totalItem}
        </span>{" "}
        {t("common.record")}.
      </div>
    </div>
  );
}
