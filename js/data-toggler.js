const layerControl = document.getElementById("layer-control-group");
const checkboxes = layerControl.querySelector('input[type=:checkbox"]');

checkboxes.forEach((boxes) => {
  if (boxes.checked) {
    console.log(boxes.value);
  }
});
