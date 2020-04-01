import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addMetric} from '../../store/metrics/actions';
import Chart from '../Chart';
import Player from '../Player';

function App() {
  const dispatch = useDispatch();
  const metrics = useSelector(store => store.metrics);

  const handleProgress = useCallback(
    payload => dispatch(addMetric(payload)),
    [dispatch]
  );

  return (
    <div className="app">
      <Player onProgress={handleProgress} />
      <Chart metrics={metrics} />
    </div>
  );
}

export default App;
