var Accessible = {
  inputs: ({ domElement }) => {
    var $el = $(domElement);

    var title = $el.find(".title").text();
    var label = $el.find(".property-name");
    var input = $el.find("input");

    input.each(function (i) {
      $(this).attr("aria-label", `${title} ${label[i].innerText}`);
    });
  },
};
