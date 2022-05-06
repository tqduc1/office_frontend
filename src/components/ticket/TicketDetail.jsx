import { Modal, Spin } from "antd";
import React, { memo } from "react";
import { ID_IMAGE_MAP } from "../../constants/common";
import Dot from "../common/Dot";
import ZoomInterRaction from "../common/ZoomInterRaction";

function TicketDetail({
  visible,
  onOk,
  onCancel,
  data,
  dataPreview,
  activities,
}) {
  return (
    <Modal
      title={`${dataPreview.buildingName} - ${dataPreview.floorName}`}
      visible={visible}
      onOk={onOk}
      centered
      onCancel={data?.floorBackground && onCancel}
      footer={null}
      width={"auto"}
    >
      {!data?.floorBackground ? (
        <div
          style={{
            width: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        <ZoomInterRaction ticketScreen={true}>
          <img
            id={ID_IMAGE_MAP}
            src={`${process.env.API_MEDIA}/${data?.floorBackground}`}
            loading="lazy"
            alt={ID_IMAGE_MAP}
          />
          <div id="elements-container">
            {data.dotDTOList?.map((ele, key) => (
              <Dot
                item={ele}
                key={key}
                isSelected={true}
                activities={activities}
                preview={true}
              />
            ))}
          </div>
        </ZoomInterRaction>
      )}
    </Modal>
  );
}
export default memo(TicketDetail);
