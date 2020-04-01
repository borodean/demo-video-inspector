import {noop} from 'lodash';
import React, {useEffect, useRef} from 'react';
import ShakaPlayer from 'shaka-player-react';

import useDriftlessInterval from '../../hooks/useDriftlessInterval';
import Record from '../../models/Record';
import {sumRanges} from '../../utils/data';

const DIMENSIONS = {width: 400, height: 320};

function Player({onRecord = noop}) {
  const controllerRef = useRef();
  const onRecordRef = useRef();

  useEffect(() => {
    onRecordRef.current = onRecord;
  }, [onRecord]);

  useEffect(() => {
    const {player} = controllerRef.current;

    const handleBufferingChange = event => {
      onRecordRef.current(new Record('buffering', event.buffering));
    };

    const handleVariantChange = () => {
      const {streamBandwidth} = player.getStats();
      onRecordRef.current(new Record('Q', streamBandwidth));
    };

    player.addEventListener('buffering', handleBufferingChange);
    player.addEventListener('adaptation', handleVariantChange);
    player.addEventListener('variantchanged', handleVariantChange);

    return () => {
      player.removeEventListener('buffering', handleBufferingChange);
      player.removeEventListener('adaptation', handleVariantChange);
      player.removeEventListener('variantchanged', handleVariantChange);
    };
  }, []);

  useDriftlessInterval(() => {
    const {player} = controllerRef.current;
    const bufferedInfo = player.getBufferedInfo();
    const {estimatedBandwidth} = player.getStats();

    const bufferSize = sumRanges(bufferedInfo.total);

    onRecord(new Record('B', bufferSize));
    onRecord(new Record('W', estimatedBandwidth));
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
