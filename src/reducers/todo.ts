import { createReducer } from "@reduxjs/toolkit";

type todoType = {
    id: string;
    text: string;
    status: 'Active' | 'Completed';
};

type todoReducerType = {
    list: todoType[];
};

const initialState: todoReducerType = {
    list: [],
};

export const todoReducer = createReducer(initialState, {
    ADD_TODO: (state, action: { type: string; payload: todoType }) => {
        state.list.push(action.payload);
    },
    REMOVE_TODO: (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
    REMOVE_COMPLETED_TODO: (state, action) => {
        state.list = state.list.filter((item) => item.status !== "Completed");
    },
    REORDER_TODO: (state, action: { type: string; payload: todoType[] }) => {
        state.list = action.payload;
    },
    TOGGLE_STATUS_TODO: (state, action) => {
        state.list = state.list.map((item) => {
            if (item.id === action.payload.id) {
                item = {
                    ...item,
                    status: item.status === 'Active' ? "Completed" : "Active",
                }
            }
            return item
        });
    },
});