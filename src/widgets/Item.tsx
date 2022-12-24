import React, {
  forwardRef,
  HTMLAttributes,
  CSSProperties,
  useContext,
} from "react";
import Clock from "../components/Clock";
import { GlobalContext } from "../util/context";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  withOpacity?: boolean;
  isDragging?: boolean;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, withOpacity, isDragging, style, ...props }, ref) => {
    const vpHeight = useContext(GlobalContext);

    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? "0.5" : "1",
      transformOrigin: "50% 50%",
      height: vpHeight * 0.25,
      width: vpHeight * 0.25,
      // minHeight: '100px',
      // minWidth: '100px',
      borderRadius: "10px",
      cursor: false ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: isDragging
        ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      // transform: isDragging ? 'scale(1)' : 'scale(1)',
      ...style,
    };

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        <Clock />
      </div>
    );
  }
);

export default Item;
