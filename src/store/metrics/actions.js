export const ADD_POINT = 'ADD_POINT';
export const START_REGION = 'START_REGION';
export const END_REGION = 'END_REGION';

export const addPoint = payload => ({
  type: ADD_POINT,
  payload
});

export const startRegion = date => ({
  type: START_REGION,
  date
});


export const endRegion = date => ({
  type: END_REGION,
  date
});
