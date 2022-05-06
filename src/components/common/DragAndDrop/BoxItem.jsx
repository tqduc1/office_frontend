import React, { memo, useState } from "react";
import DragDropContainer from "./DragDropContainer";
import { Button, Divider, Popover } from "antd";
import { useTranslation } from "react-i18next";

function BoxItem({ item, scale, idx, onRemoveDot, onUpdateDot }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const handleClickChange = (visible) => {
    setVisible(visible);
  };
  const content = (
    <div className={"popup-menu"}>
      <Button
        type="text"
        block
        onClick={() => {
          onUpdateDot(idx);
          setVisible(false);
        }}
      >
        {t("common.inactiveActive")}
      </Button>
      <Divider style={{ margin: 0 }} />
      <Button
        type="text"
        block
        onClick={() => {
          onRemoveDot(idx);
          setVisible(false);
        }}
      >
        {t("common.delete")}
      </Button>
    </div>
  );
  return (
    <div
      style={{
        position: "absolute",
        top: item.coordinateY,
        left: item.coordinateX,
      }}
    >
      <DragDropContainer
        dragData={{
          type: item.type,
          status: item.status,
          id: idx,
          isActive: item.isActive,
          data: item,
        }}
        targetKey="office"
        type={item.type}
        scale={scale}
        visible={visible}
      >
        <Popover
          placement="bottomLeft"
          content={content}
          trigger="contextMenu"
          visible={visible}
          onVisibleChange={handleClickChange}
        >
          <Button
            type="default"
            shape="circle"
            className={`${
              item.type === "seat" ? "cicrle" : "square"
            } ${item.status.toLowerCase()} ${!item.isActive && "disable"}`}
            icon={
              <div
                className={`${
                  item.type === "seat" ? "cicrle" : "square"
                } ${item.status.toLowerCase()} ${!item.isActive && "disable"}`}
              />
            }
          />
        </Popover>
      </DragDropContainer>
    </div>
  );
}

export default memo(BoxItem);
