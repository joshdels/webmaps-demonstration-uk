document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('#layer-control-group input[type="checkbox"]')
    .forEach((box) => {

      box.addEventListener("change", function () {

        if (this.checked) {
          LayerManager.addLayer(this.value);
        } else {
          LayerManager.removeLayer(this.value);
        }

      });

    });

});