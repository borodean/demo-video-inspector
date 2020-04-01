import {PLAYER_DIMENSIONS} from '../../config/constants';
import {formatBits, formatTime} from '../../utils/data';

export const DEFAULT_C3_OPTIONS = {
  axis: {
    x: {
      tick: {
        format: formatTime
      },
      type: 'timeseries'
    },
    y: {
      label: 'Кбит/с',
      tick: {
        format: formatBits
      }
    },
    y2: {
      label: 'с',
      show: true
    }
  },
  size: {
    height: PLAYER_DIMENSIONS.height,
    width: PLAYER_DIMENSIONS.width * 2
  },
  tooltip: {
    format: {
      value: (value, ratio, id) => {
        if (id === 'Q' || id === 'W') {
          return formatBits(value) + ' Кбит/с';
        }
        if (id === 'B') {
          return value + ' с';
        }
      }
    }
  }
};

export const DEFAULT_C3_DATA_OPTIONS = {
  axes: {
    B: 'y2'
  },
  keys: {
    x: 'createdAt',
    value: ['B', 'Q', 'W']
  },
  names: {
    B: 'Размер буфера',
    Q: 'Качество',
    W: 'Ширина канала'
  }
};
