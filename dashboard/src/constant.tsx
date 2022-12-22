import React from "react";
import Clock from "./components/Clock";

export const defaultImageUrl =
  "https://images.unsplash.com/photo-1670409702404-7bebbe0721cc?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzODc5NzZ8MHwxfHJhbmRvbXx8fHx8fHwxfHwxNjcwNzE2NzEy&ixlib=rb-4.0.3&q=80";
export const widgets = [
  {
    id: 1,
    type: "Clock",
    variant: "dark",
  },
  {
    id: 2,
    type: "Clock",
  },
  {
    id: 3,
    type: "Clock",
    variant: "dark",
  },
  {
    id: 4,
    type: "Clock",
  },
];

export const Components: any = {
  Clock,
};
