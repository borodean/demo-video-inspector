import { ADD_METRIC } from './actions';

export const initialState = [];

export const metricsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_METRIC:
      return [...state, action.payload].slice(-10);
    default:
      return state;
  }
};
