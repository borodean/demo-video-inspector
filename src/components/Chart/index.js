import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import C3Chart from 'react-c3js';

import {DEFAULT_C3_DATA_OPTIONS, DEFAULT_C3_OPTIONS} from './constants';

function Chart({metrics}) {
  const data = useMemo(() => ({
    ...DEFAULT_C3_DATA_OPTIONS,
    json: metrics
  }), [metrics]);

  return <C3Chart className="chart" data={data} {...DEFAULT_C3_OPTIONS} />;
}

Chart.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.instanceOf(Date).isRequired,
      B: PropTypes.number.isRequired,
      Q: PropTypes.number.isRequired,
      W: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Chart;
