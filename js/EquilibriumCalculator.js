var EquilibriumCalculator = {
  /**
   *  Get Equilibrium Quantity
   */
  calcEqQty: ({
    supply: { m: supplyM, b: supplyB },
    demand: { m: demandM, b: demandB },
  }) => {
    return MathHelpers.roundDecimal((demandB - supplyB) / (supplyM + demandM));
  },
  /**
   *  Get Equilibrium Price
   */
  calcEqPrice: (config) => {
    var eqQty = EquilibriumCalculator.calcEqQty(config);

    return MathHelpers.roundDecimal(config.supply.b + config.supply.m * eqQty);
  },
  /**
   *  Slope Formula  => y = mx + b
   *  Demand Formula => P = b - m(Q)
   */
  calcDemandSlope: ({ demand: { m, b } }) => {
    var demandPrice = b;
    var demandQty = b / m; // solve for Q

    return {
      p: demandPrice,
      q: MathHelpers.roundDecimal(demandQty),
    };
  },
  /**
   *  Supply Formula => P = b + m(Q)
   */
  calcSupplySlope: ({ supply: { m, b } }) => {
    var supplyPrice = b + m * 0; // solve for P
    var supplyQty = (10 - b) / m; // solve for Q

    return {
      p: MathHelpers.roundDecimal(supplyPrice),
      q: MathHelpers.roundDecimal(supplyQty),
    };
  },
};
