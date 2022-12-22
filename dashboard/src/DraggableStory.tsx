import React, { Children, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  Modifiers,
  MouseSensor,
  PointerActivationConstraint,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import Clock from "./components/Clock";
import { Coordinates } from "@dnd-kit/core/dist/types";
import { Draggable } from "./dnd/Draggable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useDispatch } from "react-redux";
import { WIDGET } from "./actions";

export enum Axis {
  All,
  Vertical,
  Horizontal,
}

interface DraggableItemProps {
  label: string;
  handle?: boolean;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  axis?: Axis;
  top?: number;
  left?: number;
  children: any;
}

function DraggableItem({
  axis,
  label,
  style,
  top,
  left,
  handle,
  buttonStyle,
  children,
}: DraggableItemProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: "draggable",
    });

  return (
    <Draggable
      ref={setNodeRef}
      dragging={isDragging}
      handle={handle}
      label={label}
      listeners={listeners}
      style={{ ...style, top, left }}
      buttonStyle={buttonStyle}
      transform={transform}
      axis={axis}
      {...attributes}
      attributes={attributes}
    >
      {children}
    </Draggable>
  );
}

interface Props {
  activationConstraint?: PointerActivationConstraint;
  axis?: Axis;
  handle?: boolean;
  modifiers?: Modifiers;
  buttonStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  label?: string;
  onDrag?: CallableFunction;
  children: any;
  uuid: string;
  coordinates: {
    x: number;
    y: number;
  };
}

const defaultCoordinates = {
  x: 100,
  y: 100,
};

function DraggableStory({
  activationConstraint,
  axis,
  handle,
  label = "Go ahead, drag me.",
  modifiers,
  style,
  buttonStyle,
  children,
  uuid,
  coordinates = defaultCoordinates,
}: Props) {
  const dispatch = useDispatch();
  const [{ x, y }, setCoordinates] = useState<Coordinates>(coordinates);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  return (
    <DndContext
      modifiers={[restrictToParentElement]}
      sensors={sensors}
      // onDragStart={() => onDrag(true)}
      onDragEnd={({ delta }) => {
        // onDrag(false);
        const coordinates = {
          x: x + delta.x,
          y: y + delta.y,
        };
        dispatch({
          type: WIDGET.UPDATE_CONFIG,
          payload: { uuid, coordinates },
        });
        setCoordinates(({ x, y }) => {
          return coordinates;
        });
      }}
    >
      <DraggableItem
        axis={axis}
        label={label}
        handle={handle}
        top={y}
        left={x}
        style={style}
        buttonStyle={buttonStyle}
      >
        {children}
      </DraggableItem>
    </DndContext>
  );
}

export default DraggableStory;
