import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  addPoint,
  endRegion,
  startRegion
} from '../../store/metrics/actions';
import Chart from '../Chart';
import Player from '../Player';

function App() {
  const dispatch = useDispatch();
  const {points, regions} = useSelector(store => store.metrics);

  const handleBuffering = useCallback(
    ({date, isBuffering}) => {
      const action = isBuffering ? startRegion : endRegion;
      dispatch(action(date));
    },
    [dispatch]
  );

  const handlePoint = useCallback(
    payload => dispatch(addPoint(payload)),
    [dispatch]
  );

  return (
    <div className="app">
      <Player onBuffering={handleBuffering} onPoint={handlePoint} />
      <Chart points={points} regions={regions} />
    </div>
  );
}

export default App;
