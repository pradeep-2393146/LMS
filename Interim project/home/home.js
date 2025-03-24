$(document).ready(function(){
    console.log("Script is running");
    console.log("Container:", $(".container").length);
    console.log("Navbar:", $(".navbar").length);

    $(".container").fadeIn(1000);
    $(".navbar").fadeIn(1000); // Updated selector
    const xValues = ["Completed", "Remaining"];
    const yValues = [45, 55];
    const barColors = ["green", "#b91d47"];

    const canvas = document.getElementById("myChart");
    const div = canvas.parentElement;
    canvas.width = div.offsetWidth;
    canvas.height = div.offsetHeight;

    new Chart(canvas, {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [
                {
                    backgroundColor: barColors,
                    data: yValues,
                },
            ],
        },
        options: {
            title: {
                display: true,
            },
            legend: {
                display: true,
                position: "bottom", // Position the legend below the chart
                labels: {
                    generateLabels: function(chart) {
                        const data = chart.data;
                        return data.labels.map((label, i) => {
                            const dataset = data.datasets[0];
                            const backgroundColor = dataset.backgroundColor[i];
                            return {
                                text: label,
                                fillStyle: backgroundColor,
                                strokeStyle: '#000', // Border color
                                lineWidth: 1, // Border width
                                hidden: false,
                                index: i
                            };
                        });
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = dataset.data.reduce(function (previousValue, currentValue) {
                            return previousValue + currentValue;
                        });
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = Math.floor((currentValue / total) * 100 + 0.5);
                        var label = data.labels[tooltipItem.index];
                        return label + ": " + percentage + "%";
                    },
                },
            },
            maintainAspectRatio: false
        }
    });
});