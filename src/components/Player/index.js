import {noop} from 'lodash';
import React, {useEffect, useRef} from 'react';
import ShakaPlayer from 'shaka-player-react';

import useDriftlessInterval from '../../hooks/useDriftlessInterval';
import {sumRanges} from '../../utils/data';

const DIMENSIONS = {width: 400, height: 320};

function Player({onProgress = noop}) {
  const controllerRef = useRef();
  const onProgressRef = useRef();

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useDriftlessInterval(() => {
    const {player} = controllerRef.current;

    const bufferedInfo = player.getBufferedInfo();
    const stats = player.getStats();

    onProgress({
      createdAt: new Date(),
      isBuffering: player.isBuffering(),
      B: sumRanges(bufferedInfo.total),
      Q: stats.streamBandwidth,
      W: stats.estimatedBandwidth
    });
  }, 1000);

  return (
    <div style={DIMENSIONS}>
      <ShakaPlayer
        autoPlay
        src="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd"
        ref={controllerRef}
        {...DIMENSIONS}
      />
    </div>
  );
}

export default Player;
