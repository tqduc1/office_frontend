import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import FilterStatus from "./FilterStatus";
import ZoomInterRaction from "@Components/common/ZoomInterRaction";
import { Upload } from "@Assets/image/index";
import { useDispatch, useSelector } from "react-redux";
import Dot from "@Components/common/Dot";
import { getBuildingEnableRequest } from "@Actions/BuildingActions";
import { getFloorEnableByBuildingIdRequest } from "@Actions/FloorActions";
import { getDotMapRequest, updateDotListRequest } from "@Actions/DotAction";
import { getGroupDepartmentRequest } from "@Actions/GroupDepartmentAction";
import { useTranslation } from "react-i18next";
import { MenuOutlined } from "@ant-design/icons";
import {
  addTicketRequest,
  closeMessageSuccess,
} from "../../../actions/TicketActions";
import {
  isAdmin,
  isAdminOrDuLead,
  isMember,
  uniqBy,
} from "../../../services/common";
import { ID_IMAGE_MAP } from "../../../constants/common";
import { Button, Drawer, Modal } from "antd";
import Selecto from "react-selecto";
import { updateDotMapRequest } from "../../../actions/DotAction";
import { getStorage } from "../../../http";

function OfficeMap({ activities }) {
  const [floorBackground, setFloorBackground] = useState("");
  const [checkedList, setCheckedList] = useState([]);
  const [filterList, setFilterList] = useState({ value: [], isFilter: false });
  const [isFilter, setFilter] = useState(false);
  const [scale, setScale] = useState(1);
  const [typeSelect, setTypeSelect] = useState("view");
  const [selection, setSelection] = useState(false);
  const [shiftHeld, setShiftHeld] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [loadImgSuccess, setLoadImgSuccess] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
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
  const getDotMapDispatch = useCallback(
    (param) => dispatch(getDotMapRequest(param)),
    []
  );

  const createTicketDispatch = useCallback(
    (param) => dispatch(addTicketRequest(param)),
    []
  );
  const closeMessageSuccessDispatch = useCallback(
    (param) => dispatch(closeMessageSuccess(param)),
    []
  );

  const updateDotListDispatch = useCallback(
    (param) => dispatch(updateDotListRequest(param)),
    []
  );
  const assignDotDispatch = useCallback(
    (param) => dispatch(updateDotMapRequest(param)),
    []
  );

  const { listDot, listDotSearch } = useSelector((state) => state.dot);
  const { listGroupDepartment } = useSelector((state) => state.groupDepartment);
  const { listBuildingEnable } = useSelector((state) => state.building);
  const { listFloorEnable } = useSelector((state) => state.floor);
  const { messageSuccess, isSuccess } = useSelector((state) => state.ticket);

  function downHandler({ key }) {
    if (key === "Shift") {
      setShiftHeld(true);
    }
  }

  function upHandler({ key }) {
    if (key === "Shift") {
      setShiftHeld(false);
    }
  }

  function twoFingerDetect({ key }) {
    if (key.touches.length === 2) {
      setShiftHeld(false);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    window.addEventListener("touchstart", twoFingerDetect);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
      window.removeEventListener("touchstart", twoFingerDetect);
    };
  }, []);

  let dots = isFilter ? filterList.value : listDot;
  console.log("filterList", filterList);
  const selectDotHandle = useCallback(
    (dot) => {
      let listDots = checkedList.slice();
      listDots.push(dot.id);
      setCheckedList(listDots);
      setSelection(!selection);
    },
    [checkedList, selection]
  );
  const unselectedDotHandle = useCallback(
    (dot) => {
      let listDots = checkedList.slice();
      let newListDots = listDots.filter((ele) => ele !== dot.id);
      setCheckedList(newListDots);
      setSelection(!selection);
    },
    [checkedList, selection]
  );
  const selectDotByStatusHandle = (status, type) => {
    let newListDots = listDot.filter((item) => {
      const dotInfo = () => {
        let occupied = item.dotInfoByTimeDTOList?.find(
          (ele) => ele.status === "occupied"
        );
        let allocated = item.dotInfoByTimeDTOList?.find(
          (ele) => ele.status === "allocated"
        );
        let booked = item.dotInfoByTimeDTOList.find(
          (ele) => ele.status === "booked"
        );
        let available = {
          status: "available",
        };
        return occupied || allocated || booked || available;
      };
      console.log(dotInfo());
      return dotInfo().status === status && item.type === type && item.isActive;
    });
    setFilterList({ value: newListDots, isFilter: true });
  };

  const showSuccessModal = () => {
    Modal.success({
      title: t("common.success"),
      content: messageSuccess,
      onOk() {
        setCheckedList([]);
        setSelection(!selection);
        closeMessageSuccessDispatch();
      },
    });
  };
  const clearSelectedDot = useCallback(() => {
    setCheckedList([]);
    setSelection(!selection);
  }, []);
  const filterTypeSelect = (item, typeSelect) => {
    switch (typeSelect) {
      case "action":
        return (
          item.getAttribute("active") === "true" &&
          item.getAttribute("status") === "available"
        );
      case "view":
        return (
          item.getAttribute("active") === "true" &&
          item.getAttribute("status") !== "available"
        );
      default:
        return (
          item.getAttribute("active") === "true" &&
          item.getAttribute("status") === "available"
        );
    }
  };
  const selectable = () => {
    if (!shiftHeld) {
      return (
        <Selecto
          dragContainer={"#office-map"}
          selectableTargets={["#elements-container .dot"]}
          hitRate={100}
          selectByClick={false}
          selectFromInside={true}
          ratio={0}
          onSelectEnd={(e) => {
            let listDots = checkedList.slice();
            e.selected.forEach((item) => {
              if (filterTypeSelect(item, typeSelect)) {
                listDots.push(Number(item.id));
              }
            });
            setCheckedList(uniqBy(listDots, JSON.stringify));
            setSelection(!selection);
          }}
        />
      );
    }
  };

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  return (
    <div className="office-map-wrapper">
      {isSuccess && showSuccessModal()}
      <div className={`left`}>
        <Filter
          onChangeBackround={setFloorBackground}
          checkedList={checkedList}
          onClearSelectedDot={clearSelectedDot}
          getGroupDepartmentDispatch={getGroupDepartmentDispatch}
          getBuildingDispatch={getBuildingDispatch}
          getFloorEnableByBuildingIdDispatch={
            getFloorEnableByBuildingIdDispatch
          }
          getDotMapDispatch={getDotMapDispatch}
          listGroupDepartment={listGroupDepartment}
          listBuildingEnable={listBuildingEnable}
          listFloorEnable={listFloorEnable}
          dots={listDot}
          createTicketDispatch={createTicketDispatch}
          listDotSearch={listDotSearch}
          setTypeSelect={setTypeSelect}
          typeSelect={typeSelect}
          onUnselected={unselectedDotHandle}
          updateDotListDispatch={updateDotListDispatch}
          activities={activities}
          setFilterList={setFilterList}
        />
      </div>
      <div className="right">
        <Button
          type="text"
          className="btn-drawer"
          onClick={showDrawer}
          icon={<MenuOutlined />}
        />
        <Drawer
          placement="left"
          onClose={onCloseDrawer}
          visible={visibleDrawer}
          style={{ padding: 0 }}
        >
          <div className="drawer">
            <Filter
              onChangeBackround={setFloorBackground}
              checkedList={checkedList}
              onClearSelectedDot={clearSelectedDot}
              getGroupDepartmentDispatch={getGroupDepartmentDispatch}
              getBuildingDispatch={getBuildingDispatch}
              getFloorEnableByBuildingIdDispatch={
                getFloorEnableByBuildingIdDispatch
              }
              getDotMapDispatch={getDotMapDispatch}
              listGroupDepartment={listGroupDepartment}
              listBuildingEnable={listBuildingEnable}
              listFloorEnable={listFloorEnable}
              dots={listDot}
              createTicketDispatch={createTicketDispatch}
              listDotSearch={listDotSearch}
              setTypeSelect={setTypeSelect}
              typeSelect={typeSelect}
              onUnselected={unselectedDotHandle}
              updateDotListDispatch={updateDotListDispatch}
              activities={activities}
              setFilterList={setFilterList}
            />
          </div>
        </Drawer>
        {floorBackground ? (
          <>
            <div className="preview-container" id="office-map">
              {selectable()}
              <ZoomInterRaction
                setScale={setScale}
                loadImgSuccess={loadImgSuccess}
              >
                <img
                  id={ID_IMAGE_MAP}
                  src={`${process.env.API_MEDIA}/${floorBackground}`}
                  loading="lazy"
                  alt={ID_IMAGE_MAP}
                  onLoad={(e) =>
                    e.isTrusted && setLoadImgSuccess(!loadImgSuccess)
                  }
                />
                <div id="elements-container">
                  {dots?.map((ele, key) => (
                    <Dot
                      item={ele}
                      key={key}
                      isSelected={checkedList.includes(ele.id)}
                      onUnselected={unselectedDotHandle}
                      onSelected={selectDotHandle}
                      createTicketDispatch={createTicketDispatch}
                      typeSelect={typeSelect}
                      reclaimDotListDispatch={updateDotListDispatch}
                      assignDotDispatch={assignDotDispatch}
                      activities={activities}
                    />
                  ))}
                </div>
              </ZoomInterRaction>
            </div>
            <FilterStatus
              onSelectDotByStatus={selectDotByStatusHandle}
              setFilterList={setFilterList}
              filterList={filterList}
              setFilter={setFilter}
              typeSelect={typeSelect}
            />
          </>
        ) : (
          <div className="noImage">
            <img src={Upload} alt="upload" />
            <p>{t("office.selectFloorToPreview")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default memo(OfficeMap);
