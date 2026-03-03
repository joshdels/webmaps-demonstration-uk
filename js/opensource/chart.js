const ctx = document.getElementById("myChart");

const url = "data/iow_town.geojson";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const townPop = data.features.map((f) => ({
      town: f.properties.Town,
      pop: f.properties.Population,
    }));

    townPop.sort((a, b) => a.town.localeCompare(b.town));

    const town = townPop.map((item) => item.town);
    const population = townPop.map((item) => item.pop);

    const colors = [
      "#dc3545",
      "#0d6efd",
      "#ffc107",
      "#198754",
      "#6f42c1",
      "#fd7e14",
      "#20c997",
      "#6610f2",
      "#d63384",
      "#adb5bd",
    ];

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: town,
        datasets: [
          {
            label: "Population",
            data: population,
            backgroundColor: colors,
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "50%",
        plugins: {
          legend: { position: "bottom" },
          title: {
            display: true,
            text: "Population per Towns",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw;
                const total = context.dataset.data.reduce(
                  (acc, val) => acc + val,
                  0,
                );
                const percentage = ((value / total) * 100).toFixed(2);
                return `${context.label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      },
    });
  });
