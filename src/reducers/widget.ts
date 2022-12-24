import { createReducer } from "@reduxjs/toolkit";
import uuid from "react-uuid";

type widgetType = {
    id: number;
    uuid: string;
    type: string;
    variant: string;
    coordinates: {
        x: number;
        y: number;
    },
    timezone?: string;
};
export type widgetReducerType = {
    list: widgetType[];
};

const initialState: widgetReducerType = {
    list: [],
};

export const widgetReducer = createReducer(initialState, {
    ADD_WIDGET: (state, action: { type: string; payload: widgetType }) => {
        state.list.push({ ...action.payload, uuid: uuid() });
    },
    REMOVE_WIDGET: (state, action) => {
        const { uuid } = action.payload;
        state.list = state.list.filter((item) => item.uuid !== uuid);
    },
    UPDATE_CONFIG: (state, action) => {
        const { uuid } = action.payload;
        state.list = state.list.map(item => {
            if (item.uuid === uuid) {
                return { ...item, ...action.payload };
            }
            return item;
        });
    },
});