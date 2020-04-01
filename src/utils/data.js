export const formatBits = bits => Math.round(bits / 1024);

export const formatTime = date =>
  date.toLocaleString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

export const sumRanges = ranges =>
  ranges.reduce((sum, {start, end}) => sum - start + end, 0);
