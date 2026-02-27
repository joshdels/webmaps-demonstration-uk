const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: "Population",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#dc3545",
        "#0d6efd",
        "#ffc107",
        "#198754",
        "#6f42c1",
        "#fd7e14"
      ],
      borderColor: "#ffffff",
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    cutout: "55%",
    plugins: {
      legend: {
        position: "bottom"
      },
      tooltip: {
        enabled: true
      },
      title: {
        display: true,
        text: 'Population per Towns'
      }
    }
  }
});