function MakeChart(
  chartId,
  { supplySlope: supply, demandSlope: demand, eqQty, eqPrice }
) {
  var ctx = document.getElementById(chartId).getContext("2d");
  var newChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: MathHelpers.xAxisStepSize(0, 10, 0.01),
      datasets: [
        {
          label: "supply",
          lineTension: 0.4,
          data: [
            {
              x: 0,
              y: supply.p,
            },
            {
              x: supply.q,
              y: 10,
            },
          ],
          backgroundColor: ["transparent"],
          borderColor: ["red"],
          borderWidth: 1,
        },
        {
          label: "demand",
          lineTension: 0.4,
          data: [
            {
              x: 0,
              y: demand.p,
            },
            {
              x: demand.q,
              y: 0,
            },
          ],
          backgroundColor: ["transparent"],
          borderColor: ["blue"],
          borderWidth: 1,
        },
        {
          label: "equilibrium",
          lineTension: 0,
          data: [
            {
              x: 0,
              y: eqPrice,
            },
            {
              x: eqQty,
              y: eqPrice,
            },
            {
              x: eqQty,
              y: 0,
            },
          ],
          borderDash: [1, 1],
          backgroundColor: ["transparent"],
          borderColor: ["rgb(0, 201, 201)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      animation: {
        duration: 0,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 10,
              maxTicksLimit: 11,
              callback: function (value, index, values) {
                return "$" + value;
              },
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              autoSkip: true, // Calculates number of lables to display and hides accordingly
              maxTicksLimit: 10, // Depends on total number of lables, in this instance: 3=> integer intervals, 7=> .5 intervals
              maxRotation: 0,
            },
          },
        ],
      },
    },
  });
}
