import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import ShakaPlayer from 'shaka-player-react';

import {
  PLAYER_DIMENSIONS,
  PLAYER_URL,
  POLLING_INTERVAL
} from '../../config/constants';
import useWorkerInterval from '../../hooks/useWorkerInterval';
import {sumRanges} from '../../utils/data';

function Player({onBuffering, onPoint}) {
  const controllerRef = useRef();

  useEffect(() => {
    const {player} = controllerRef.current;

    const handleBuffering = event => {
      onBuffering({date: new Date(), isBuffering: event.buffering});
    };

    player.addEventListener('buffering', handleBuffering);

    return () => {
      player.removeEventListener('buffering', handleBuffering);
    };
  }, [onBuffering]);

  useWorkerInterval(() => {
    const {player} = controllerRef.current;

    const bufferedInfo = player.getBufferedInfo();
    const stats = player.getStats();

    onPoint({
      date: new Date(),
      B: Math.round(sumRanges(bufferedInfo.total)),
      Q: stats.streamBandwidth,
      W: Math.round(stats.estimatedBandwidth)
    });
  }, POLLING_INTERVAL);

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
  onBuffering: PropTypes.func.isRequired,
  onPoint: PropTypes.func.isRequired
};

export default Player;
