import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import ShakaPlayer from 'shaka-player-react';

import {PLAYER_DIMENSIONS, PLAYER_URL} from '../../config/constants';
import useDriftlessInterval from '../../hooks/useDriftlessInterval';
import {sumRanges} from '../../utils/data';

function Player({onProgress}) {
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
      W: Math.round(stats.estimatedBandwidth)
    });
  }, 1000);

  return (
    <div className="player" style={PLAYER_DIMENSIONS}>
      <ShakaPlayer
        autoPlay
        src={PLAYER_URL}
        ref={controllerRef}
        {...PLAYER_DIMENSIONS}
      />
    </div>
  );
}

Player.propTypes = {
  onProgress: PropTypes.func.isRequired
};

export default Player;
