import {
  ADD_POINT,
  START_REGION,
  END_REGION
} from './actions';

export const initialState = {
  regions: [],
  points: []
};

export const metricsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POINT:
      return {
        ...state,
        points: [...state.points, action.payload].slice(-10)
      };
    case START_REGION:
      return {
        ...state,
        regions: [...state.regions, {start: action.date}].slice(-10)
      };
    case END_REGION: {
      const lastRegion = state.regions[state.regions.length - 1];
      const otherRegions = state.regions.slice(0, -1);
      return {
        ...state,
        regions: [...otherRegions, {...lastRegion, end: action.date}]
      };
    }
    default:
      return state;
  }
};
