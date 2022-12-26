import React, { forwardRef, useState } from "react";
import classNames from "classnames";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";

import {
  draggable,
  draggableHorizontal,
  draggableVertical,
} from "./draggable-svg";
import styles from "./Draggable.module.css";
import { FaArrowsAlt, FaArrowsAltH, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { WIDGET } from "../../actions";

export enum Axis {
  All,
  Vertical,
  Horizontal,
}

interface Props {
  axis?: Axis;
  dragOverlay?: boolean;
  dragging?: boolean;
  handle?: boolean;
  label?: string;
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  transform?: Transform | null;
  children: any;
  attributes?: any;
}

export const Draggable = forwardRef<HTMLButtonElement, Props>(
  function Draggable(
    {
      axis,
      dragOverlay,
      dragging,
      handle = true,
      label,
      listeners,
      transform,
      style,
      buttonStyle,
      children,
      attributes,
      ...props
    },
    ref
  ) {
    const [size, setSize] = useState({ x: 200, y: 200 });
    const [hover, sethover] = useState(false);
    const dispatch = useDispatch();

    const handler = (mouseDownEvent: any) => {
      const startSize = size;
      const startPosition = {
        x: mouseDownEvent.pageX,
        y: mouseDownEvent.pageY,
      };

      function onMouseMove(mouseMoveEvent: any) {
        const x = startSize.x - startPosition.x + mouseMoveEvent.pageX;
        const y = startSize.y - startPosition.y + mouseMoveEvent.pageY;

        setSize((currentSize) => ({
          x: x,
          y: x,
        }));
      }
      function onMouseUp() {
        document.body.removeEventListener("mousemove", onMouseMove);
        // uncomment the following line if not using `{ once: true }`
        // document.body.removeEventListener("mouseup", onMouseUp);
      }

      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp, { once: true });
    };

    let timeout: any = null;
    const handleOnMouseEnter = () => {
      sethover(true);
      clearTimeout(timeout);
    };

    const handleOnMouseLeave = () => {
      timeout = setTimeout(() => sethover(false), 3000);
    };

    const removeWidget = () => {
      dispatch({
        type: WIDGET.REMOVE_WIDGET,
        payload: { uuid: children.props.uuid },
      });
    };

    return (
      <>
        <button
          className={classNames(
            styles.Draggable,
            dragOverlay && styles.dragOverlay,
            dragging && styles.dragging,
            handle && styles.handle
          )}
          {...props}
          aria-label="Draggable"
          data-cypress="draggable-item"
          {...(handle ? {} : listeners)}
          tabIndex={handle ? -1 : undefined}
          ref={ref}
          style={
            {
              ...style,
              position: "absolute",
              "--translate-x": `${transform?.x ?? 0}px`,
              "--translate-y": `${transform?.y ?? 0}px`,
            } as React.CSSProperties
          }
        >
          <div
            id="container"
            style={{
              width: size.x,
              height: size.y,
              position: "relative",
            }}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            {children}

            <FaArrowsAltH
              size={"15"}
              style={{
                position: "absolute",
                bottom: -20,
                right: 38,
                color: "white",
                rotate: "45deg",
                cursor: "nwse-resize",
                display: hover ? "initial" : "none",
              }}
              onMouseDown={handler}
            />
            <FaTrash
              size={"15"}
              style={{
                position: "absolute",
                top: 0,
                right: -5,
                color: "white",
                cursor: "pointer",
                display: hover ? "initial" : "none",
              }}
              onClick={removeWidget}
            />
          </div>
        </button>
        <button
          className={classNames(
            styles.Draggable,
            dragOverlay && styles.dragOverlay,
            dragging && styles.dragging,
            handle && styles.handle
          )}
          {...listeners}
          style={
            {
              ...style,
              position: "absolute",
              display: hover ? "initial" : "none",
              "--translate-x": `${transform?.x ?? 0}px`,
              "--translate-y": `${transform?.y ?? 0}px`,
            } as React.CSSProperties
          }
        >
          <FaArrowsAlt
            size={"15"}
            style={{
              position: "absolute",
              top: 0,
              right: -5,
              color: "white",
            }}
          />
        </button>
      </>
    );
  }
);
