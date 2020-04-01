import PropTypes from 'prop-types';
import React, {useMemo} from 'react';

import MonkeyPatchedC3Chart from '../MonkeyPatchedC3Chart';
import {DEFAULT_C3_DATA_OPTIONS, DEFAULT_C3_OPTIONS} from './constants';

function Chart({metrics}) {
  const data = useMemo(
    () => ({
      ...DEFAULT_C3_DATA_OPTIONS,
      json: metrics
    }),
    [metrics]
  );

  const regions = useMemo(
    () =>
      metrics.reduce((regions, metric, index, metrics) => {
        const prevMetric = metrics[index - 1];
        const wasBuffering = prevMetric && prevMetric.isBuffering;
        const {createdAt, isBuffering} = metric;

        if (isBuffering && !wasBuffering) {
          regions.push({
            start: createdAt
          });
        }

        if (wasBuffering && !isBuffering) {
          regions[regions.length - 1].end = createdAt;
        }

        return regions;
      }, []),
    [metrics]
  );

  return (
    <div className="chart">
      <MonkeyPatchedC3Chart
        {...DEFAULT_C3_OPTIONS}
        data={data}
        regions={regions}
      />
      <svg className="buffering-legend" width="94" height="14">
        <g className="c3-legend-item">
          <text x="16.0" y="9">
            Буферизация
          </text>
          <line
            className="c3-legend-item-tile"
            stroke="#ecf2f7"
            strokeWidth="10"
            x2="10"
            y1="4"
            y2="4"
          ></line>
        </g>
      </svg>
    </div>
  );
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
