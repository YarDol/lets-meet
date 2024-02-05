import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionSlice = createSlice({
  name: "profession",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    professionRequested: (state) => {
      state.isLoading = true;
    },
    professionReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: professionReducer, actions } = professionSlice;

const { professionRequested, professionReceived, professionRequestFailed } =
  actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadProfessionList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutdated(lastFetch)) {
    dispatch(professionRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionReceived(content));
    } catch (error) {
      dispatch(professionRequestFailed(error.message));
    }
  }
};

export const getProfession = () => (state) => state.profession.entities;
export const getProfessionLoadingStatus = () => (state) =>
  state.profession.isLoading;

export const getProfessionById = (id) => (state) => {
  if (state.profession.entities) {
    return state.profession.entities.find((p) => p._id === id);
  }
};

export default professionReducer;
