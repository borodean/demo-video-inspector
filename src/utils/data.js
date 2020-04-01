export const sumRanges = ranges =>
  ranges.reduce((sum, {start, end}) => sum - start + end, 0);
