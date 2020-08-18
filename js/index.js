$(window).ready(function () {
  var CONFIG_KEY = "storageConfig";
  var USER_MENU_TOGGLE_KEY = "userHasToggledMenu";
  var config = localStorage.getItem(CONFIG_KEY)
    ? JSON.parse(localStorage.getItem(CONFIG_KEY))
    : {
        supply: {
          m: 1,
          b: 1,
        },
        demand: {
          m: 1,
          b: 10,
        },
      };

  var gui = new dat.GUI(config);
  var supplyFolder = gui.addFolder("supply");
  var demandFolder = gui.addFolder("demand");

  gui.close();
  supplyFolder
    .add(config.supply, "m")
    .min(1)
    .max(10)
    .step(1)
    .onChange(onChange);
  supplyFolder
    .add(config.supply, "b")
    .min(1)
    .max(10)
    .step(1)
    .onChange(onChange);
  supplyFolder.open();
  Accessible.inputs(supplyFolder);
  demandFolder
    .add(config.demand, "m")
    .min(1)
    .max(10)
    .step(1)
    .onChange(onChange);
  demandFolder
    .add(config.demand, "b")
    .min(1)
    .max(10)
    .step(1)
    .onChange(onChange);
  demandFolder.open();
  Accessible.inputs(demandFolder);

  var el = {
    equilibrium: $("<p></p>").addClass("equilibrium"),
  };

  var result = $("#result .body").empty();

  // Manipulate DOM when input value is updated
  function onChange() {
    var eqQty = EquilibriumCalculator.calcEqQty(config);
    var eqPrice = EquilibriumCalculator.calcEqPrice(config);
    var demandSlope = EquilibriumCalculator.calcDemandSlope(config);
    var supplySlope = EquilibriumCalculator.calcSupplySlope(config);

    if (eqQty <= 0 || eqPrice <= 0 || isNaN(eqQty) || isNaN(eqPrice)) {
      el.equilibrium.html(`Equilibrium price: <span>&#8734;</span>`);
    } else {
      el.equilibrium.html(`Equilibrium price: <span>$${eqPrice}</span>`);
    }

    result.append(el.equilibrium);
    MakeChart("EquilibriumChart", {
      supplySlope,
      demandSlope,
      eqQty,
      eqPrice,
    });
  }

  var userHasToggledMenu = localStorage.getItem(USER_MENU_TOGGLE_KEY);
  if (!userHasToggledMenu) {
    $(".dg .close-button")
      .addClass("pulse")
      .on("click", function (e) {
        localStorage.setItem(USER_MENU_TOGGLE_KEY, true);
        $(this).removeClass("pulse");
      });
  }

  // Run calculation on initial load
  onChange();

  // Store users config data locally before they leave
  $(window).on("unload", function () {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  });
});
