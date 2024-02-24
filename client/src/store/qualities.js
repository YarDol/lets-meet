import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";
import { createSelector } from "reselect";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;

const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
  actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutdated(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualityService.fetchAll();
      dispatch(qualitiesReceived(content));
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading;

const getQualitiesEntities = (state) => state.qualities.entities;

export const getQualitiesByIds = (qualitiesIds) =>
  createSelector([getQualitiesEntities], (qualitiesEntities) => {
    if (qualitiesEntities) {
      const qualitiesArray = [];
      for (const qualityId of qualitiesIds) {
        for (const quality of qualitiesEntities) {
          if (quality._id === qualityId) {
            qualitiesArray.push(quality);
            break;
          }
        }
      }
      return qualitiesArray;
    }
    return [];
  });

export default qualitiesReducer;
