var MathHelpers = {
  roundDecimal: (num) => Number(Math.round(num + "e2") + "e-2"),
  /**
   *  Creates x-axis plotting points
   */
  xAxisStepSize: (start, stop, step) => {
    let resultArray = [];

    for (let i = start; i <= stop; i += step) {
      resultArray.push(MathHelpers.roundDecimal(i));
    }

    return resultArray;
  },
};
