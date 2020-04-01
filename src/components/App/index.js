import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {addMetric} from '../../store/metrics/actions';
import Player from '../Player';

function App() {
  const dispatch = useDispatch();

  const handleProgress = useCallback(
    payload => dispatch(addMetric(payload)),
    [dispatch]
  );

  return <Player onProgress={handleProgress} />;
}

export default App;
