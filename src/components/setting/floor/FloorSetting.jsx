import React, { useCallback, useEffect, useState } from "react";
import { Typography, Button, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const { Title } = Typography;
import { useTranslation } from "react-i18next";
import TableFloor from "./TableFloor";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFloorRequest,
  deleteMultipleFloorRequest,
  getFloorRequest,
  searchFloorRequest,
  updateEnableFloorRequest,
} from "@Actions/FloorActions";
import { DESC_SORT, LIMIT } from "@Constants/common";
import Loading from "@Components/common/Loading";

export default function FloorSetting() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getFloorDispatch = useCallback(
    (param) => dispatch(getFloorRequest(param)),
    []
  );

  const searchFloorDispatch = useCallback(
    (param) => dispatch(searchFloorRequest(param)),
    []
  );

  const deleteFloorDispatch = useCallback(
    (param) => dispatch(deleteFloorRequest(param)),
    []
  );

  const deleteMultipleFloorDispatch = useCallback(
    (param) => dispatch(deleteMultipleFloorRequest(param)),
    []
  );
  const updateEnableFloorDispatch = useCallback(
    (param) => dispatch(updateEnableFloorRequest(param)),
    []
  );
  const { isLoading, listFloor, totalItem, activePage, textSearch } =
    useSelector((state) => state.floor);

  useEffect(() => {
    getFloorDispatch({ page: 1, size: LIMIT, sort: "id", sortType: DESC_SORT });
  }, []);

  const handleSearch = (value) => {
    searchFloorDispatch({
      page: 1,
      size: LIMIT,
      floorName: value
        .trim()
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ""),
      sort: "id",
      sortType: DESC_SORT,
    });
  };
  const [pram, setParam] = useState(textSearch);

  let history = useHistory();
  return (
    <>
      <Loading loading={isLoading} />
      <div className={`list-header`}>
        <Title level={3}>{t("setting.floorList")}</Title>
        <div className="list-header-left">
          <div className="search">
            <Input.Search
              placeholder={t("setting.searchByName")}
              onSearch={handleSearch}
              onChange={(e) =>
                setParam(
                  e.target.value.replace(
                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                    ""
                  )
                )
              }
              value={pram}
              enterButton
            />
          </div>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => history.push("/setting/create-floor")}
          >
            {t("common.create")}
          </Button>
        </div>
      </div>
      <TableFloor
        listFloor={listFloor}
        totalItem={totalItem}
        activePage={activePage}
        textSearch={textSearch}
        deleteFloorDispatch={deleteFloorDispatch}
        getFloorDispatch={getFloorDispatch}
        searchFloorDispatch={searchFloorDispatch}
        deleteMultipleFloorDispatch={deleteMultipleFloorDispatch}
        updateEnableFloorDispatch={updateEnableFloorDispatch}
      />
    </>
  );
}
