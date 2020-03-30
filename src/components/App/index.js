import React from 'react';

import Player from '../Player';

function App() {
  return (
    <Player
      onBufferingChange={console.log.bind(this, 'onBufferingChange')}
      onEstimatedBandwidthChange={console.log.bind(this, 'onEstimatedBandwidthChange')}
      onStreamBandwidthChange={console.log.bind(this, 'onStreamBandwidthChange')}
    />
  );
}

export default App;
