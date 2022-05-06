import React, { useEffect, useCallback, useState } from "react";
import { Typography, Input } from "antd";
import ModalCreate from "./ModalCreate";
const { Title } = Typography;
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBuildingRequest,
  deleteMultipleBuildingRequest,
  getBuildingRequest,
  searchBuildingRequest,
  updateBuildingRequest,
} from "@Actions/BuildingActions";
import { DESC_SORT, LIMIT } from "@Constants/common";
import TableBuilding from "./TableBuilding";
import Loading from "@Components/common/Loading";
import { onKeyPressNotAllowedSpecialCharacters } from "@Services/common";

export default function BuildingSetting() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getBuildingDispatch = useCallback(
    (param) => dispatch(getBuildingRequest(param)),
    []
  );
  const searchBuildingDispatch = useCallback(
    (param) => dispatch(searchBuildingRequest(param)),
    []
  );
  const updateBuildingDispatch = useCallback(
    (param) => dispatch(updateBuildingRequest(param)),
    []
  );
  const deleteBuildingDispatch = useCallback(
    (param) => dispatch(deleteBuildingRequest(param)),
    []
  );
  const deleteMultipleBuildingDispatch = useCallback(
    (param) => dispatch(deleteMultipleBuildingRequest(param)),
    []
  );

  const { isLoading, listBuilding, totalItem, activePage, textSearch } =
    useSelector((state) => state.building);
  useEffect(() => {
    getBuildingDispatch({
      page: 1,
      size: LIMIT,
      sort: "id",
      order: DESC_SORT,
    });
  }, []);
  const handleSearch = (value) => {
    searchBuildingDispatch({
      page: 1,
      size: LIMIT,
      buildingName: value
        .trim()
        .replace(/[`~!@#$%^&*_|+/=?;:'"<>\{\}\[\]\\\/]/gi, ""),
      sort: "id",
      order: DESC_SORT,
    });
  };
  const [pram, setParam] = useState(textSearch);

  return (
    <>
      <Loading loading={isLoading} />
      <div className="list-header">
        <Title level={3}>{t("setting.buildingList")}</Title>
        <div className="list-header-left">
          <div className="search">
            <Input.Search
              placeholder={t("setting.searchByName")}
              onSearch={handleSearch}
              onChange={(e) =>
                setParam(
                  e.target.value.replace(
                    /[`~!@#$%^&*_|+/=?;:'"<>\{\}\[\]\\\/]/gi,
                    ""
                  )
                )
              }
              value={pram}
              enterButton
            />
          </div>
          <ModalCreate />
        </div>
      </div>
      <TableBuilding
        listBuilding={listBuilding}
        totalItem={totalItem}
        activePage={activePage}
        textSearch={textSearch}
        getBuildingDispatch={getBuildingDispatch}
        searchBuildingDispatch={searchBuildingDispatch}
        updateBuildingDispatch={updateBuildingDispatch}
        deleteBuildingDispatch={deleteBuildingDispatch}
        deleteMultipleBuildingDispatch={deleteMultipleBuildingDispatch}
      />
    </>
  );
}
