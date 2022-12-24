import { createReducer } from "@reduxjs/toolkit";

type todoType = {
    id: string;
    text: string;
    status: 'onProgress';
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
        state.list = state.list.filter((list) => list.id !== action.userId);
    },
});