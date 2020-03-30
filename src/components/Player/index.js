import {noop} from 'lodash';
import React, {useEffect, useRef} from 'react';
import ShakaPlayer from 'shaka-player-react';

import useDriftlessInterval from '../../hooks/useDriftlessInterval';

function Player({
  onBufferingChange = noop,
  onEstimatedBandwidthChange = noop,
  onStreamBandwidthChange = noop
}) {
  const controllerRef = useRef();

  useEffect(() => {
    const {player} = controllerRef.current;

    const handleBufferingChange = event => {
      onBufferingChange(event.buffering);
    };

    const handleVariantChange = () => {
      const stats = player.getStats();
      onStreamBandwidthChange(stats.streamBandwidth);
    };

    player.addEventListener('buffering', handleBufferingChange);
    player.addEventListener('adaptation', handleVariantChange);
    player.addEventListener('variantchanged', handleVariantChange);

    return () => {
      player.removeEventListener('buffering', handleBufferingChange);
      player.removeEventListener('adaptation', handleVariantChange);
      player.removeEventListener('variantchanged', handleVariantChange);
    };
  }, [onBufferingChange, onStreamBandwidthChange]);

  useDriftlessInterval(() => {
    const stats = controllerRef.current.player.getStats();
    onEstimatedBandwidthChange(stats.estimatedBandwidth);
  }, 1000);

  return (
    <ShakaPlayer
      autoPlay
      src="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd"
      ref={controllerRef}
    />
  );
}

export default Player;
