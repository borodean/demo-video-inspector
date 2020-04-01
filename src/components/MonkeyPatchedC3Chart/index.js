import C3Chart from 'react-c3js';

// Fixes the issue:
// https://github.com/bcbcarl/react-c3js/issues/18

class MonkeyPatchedC3Chart extends C3Chart {
  loadNewData() {}

  updateChart(config) {
    super.updateChart(config);

    if (config.regions) {
      this.chart.regions(config.regions);
    } else if (this.chart.regions && !config.regions) {
      this.chart.regions([]);
    }

    super.loadNewData(config.data);
  }
}

export default MonkeyPatchedC3Chart;
