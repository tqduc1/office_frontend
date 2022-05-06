import React, { useEffect, useState } from "react";
import { ID_IMAGE_MAP } from "../../../constants/common";
import ZoomInteractionController from "./ZoomInteractionController";

/*
  This component provides a map like interaction to any content that you place in it. It will let
  the user zoom and pan the children by scaling and translating props.children using css.
*/

const ZoomInteraction = (props) => {
  const [cursor, setCursor] = useState("default");
  const [rect, setRect] = useState({ width: 0, height: 0 });

  const [rectControlZone, setRectControlZone] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!props.ticketScreen) {
      const elem = document.getElementById(ID_IMAGE_MAP);
      if (elem.offsetWidth !== 0) {
        let controlZone = document.getElementById("control-zone");
        let rectControlZoneElem = controlZone?.getBoundingClientRect();
        setRect({
          width: elem.offsetWidth,
          height: elem.offsetHeight,
        });
        setRectControlZone(rectControlZoneElem);
      }
    }
  }, [document.getElementById(ID_IMAGE_MAP)?.offsetWidth]);

  return (
    <ZoomInteractionController
      {...props}
      rectControlZone={rectControlZone}
      rect={rect}
    >
      {({ translation, scale }) => {
        const transform = `translate(${translation.x}px, ${translation.y}px) scale(${scale})`;
        return (
          <div
            id="control-zone"
            style={{
              height: "100%",
              width: "100%",
              position: "relative", // for absolutely positioned children
              overflow: "hidden",
              touchAction: "none", // Not supported in Safari :(
              msTouchAction: "none",
              cursor: cursor,
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              display: "flex",
            }}
            onMouseMoveCapture={(e) => {
              if (e.shiftKey) {
                if (
                  cursor !== "move" &&
                  window.location.pathname !== "/setting/floor-detail"
                )
                  setCursor("move");
              } else if (e.ctrlKey) {
                if (
                  cursor !== "zoom-in" &&
                  window.location.pathname !== "/setting/floor-detail"
                )
                  setCursor("zoom-in");
              } else {
                if (
                  cursor !== "default" &&
                  window.location.pathname !== "/setting/floor-detail"
                )
                  setCursor("default");
              }
            }}
            onMouseDown={(e) => {
              if (window.location.pathname === "/setting/floor-detail") {
                if (cursor !== "move") setCursor("move");
              }
            }}
            onMouseUp={(e) => {
              if (window.location.pathname === "/setting/floor-detail") {
                if (cursor !== "default") setCursor("default");
              }
            }}
          >
            <div
              style={{
                display: "inline-block", // size to content
                transform: transform,
                transformOrigin: "0 0 ",
              }}
            >
              {props.children}
            </div>
          </div>
        );
      }}
    </ZoomInteractionController>
  );
};

export default ZoomInteraction;
