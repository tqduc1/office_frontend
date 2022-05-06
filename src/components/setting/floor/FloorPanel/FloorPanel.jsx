import React, { memo, useEffect, useState } from "react";
import FormFloor from "./FormFloor";
import { useDropzone } from "react-dropzone";
import ZoomInterRaction from "@Components/common/ZoomInterRaction";
import { DropTarget, BoxItem } from "@Components/common/DragAndDrop";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Upload } from "@Assets/image";
import { useDispatch, useSelector } from "react-redux";
import { getDotMapRequest } from "@Actions/DotAction";
import { ID_IMAGE_MAP } from "../../../../constants/common";
import moment from "moment";

function FloorPanel({ onCollapse, type, floorData = null, onSubmit }) {
  const [files, setFiles] = useState([]);
  const [isPreview, setPreview] = useState(floorData ? true : false);
  const [dots, setDots] = useState([]);
  const [deleteDots, setDeleteDots] = useState([]);
  const [scale, setScale] = useState(1);
  const [loadImgSuccess, setLoadImgSuccess] = useState(false);
  const dispatch = useDispatch();
  const getDotMapDispatch = (param) => dispatch(getDotMapRequest(param));
  useEffect(() => {
    onCollapse(true);
    if (floorData) {
      getDotMapDispatch({
        floorId: floorData.id,
        department: "",
        username: "",
        fromDate: moment(new Date()).format("YYYY-MM-DD"),
        toDate: moment(new Date()).format("YYYY-MM-DD"),
        typeSelect: "action",
      });
    }
  }, []);

  const { listDot } = useSelector((state) => state.dot);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setPreview(true);
    },
  });

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  useEffect(() => {
    if (floorData) {
      setDots(listDot);
    }
  }, [listDot]);
  const dropped = async (e) => {
    let ev = { ...e };
    if (!ev.x) {
      ev["dragData"] = { type: "seat", status: "available", id: -1 };
      ev["x"] = ev.clientX;
      ev["y"] = ev.clientY;
    }
    let clientX = ev.x;
    let clientY = ev.y;
    let elem = document.getElementById(ID_IMAGE_MAP);
    let rect = elem.getBoundingClientRect();
    if (
      rect.top <= clientY &&
      rect.bottom >= clientY &&
      rect.left <= clientX &&
      rect.right >= clientX
    ) {
      let paddingOffset = 4 * scale;
      let x = (clientX - rect.left - paddingOffset) / scale;
      let y = (clientY - rect.top - paddingOffset * 2) / scale;
      let items = dots.slice();

      if (type === "edit") {
        items.push({
          type: ev.dragData.type,
          status: ev.dragData.status,
          isActive: ev.dragData.id !== -1 ? ev.dragData.isActive : true,
          ...ev.dragData.data,
          coordinateY: y,
          coordinateX: x,
        });
      } else {
        items.push({
          coordinateY: y,
          coordinateX: x,
          type: ev.dragData.type,
          status: ev.dragData.status,
          isActive: ev.dragData.id !== -1 ? ev.dragData.isActive : true,
        });
      }
      if (ev.dragData.id !== -1) {
        items.splice(ev.dragData.id, 1);
      }
      setDots(items);
    }
  };

  const removeDot = (id) => {
    let items = dots.slice();
    if (items[id].id) {
      let deleteItems = deleteDots.slice();
      deleteItems.push(items[id].id);
      setDeleteDots(deleteItems);
    }
    items.splice(id, 1);
    setDots(items);
  };
  const updateDot = (id) => {
    let items = dots.slice();
    items[id].isActive = !items[id].isActive;
    setDots(items);
  };

  const closePreviewHandle = () => {
    setPreview(false);
    type === "create" && setDots([]);
  };

  return (
    <div className="floor-container">
      <FormFloor
        onCollapse={onCollapse}
        type={type}
        onOpenSelectImage={open}
        floorUpdateData={floorData}
        dots={dots}
        deleteDots={deleteDots}
        file={files[0]}
        onSubmit={onSubmit}
        isPreview={isPreview}
      />
      <div className="floor-container-right">
        {isPreview ? (
          <div className="preview-container">
            <div className="button-close">
              <Button
                type="text"
                shape="circle"
                onClick={closePreviewHandle}
                icon={<CloseOutlined />}
              />
            </div>
            <ZoomInterRaction
              setScale={setScale}
              loadImgSuccess={loadImgSuccess}
            >
              <div>
                <DropTarget targetKey="office" onHit={dropped}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <img
                      id={ID_IMAGE_MAP}
                      src={
                        files && files[0]
                          ? files[0].preview
                          : `${process.env.API_MEDIA}/${floorData.backgroundFloor}`
                      }
                      loading="lazy"
                      onMouseDown={(e) => {
                        if (e.shiftKey === false) dropped(e);
                      }}
                      onLoad={(e) =>
                        e.isTrusted && setLoadImgSuccess(!loadImgSuccess)
                      }
                      alt={ID_IMAGE_MAP}
                    />
                    {dots.map((ele, idx) => (
                      <BoxItem
                        item={ele}
                        key={idx}
                        idx={idx}
                        scale={scale}
                        onRemoveDot={removeDot}
                        onUpdateDot={updateDot}
                      />
                    ))}
                  </div>
                </DropTarget>
              </div>
            </ZoomInterRaction>
          </div>
        ) : (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <img src={Upload} alt="upload" />
            <p>Drag and Drop your file to here or click to select file</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(FloorPanel);
