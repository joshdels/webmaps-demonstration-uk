const toggleBtn = document.getElementById("toggle-legend");
toggleBtn.addEventListener("click", () => {
  const div = document.getElementById("legendDiv");
  div.style.display = div.style.display === "none" ? "block" : "none";
});
