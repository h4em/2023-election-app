let hintIndex = -1;

document.addEventListener('DOMContentLoaded', function() {
    searchbarSetup();
    hintContainerSetup();
    chartSetup();
});

document.addEventListener('keydown', function (event) {
    const hintsContainer = document.getElementById('search-hints-div');
    const hints = hintsContainer.querySelectorAll('.hint-div');

    if (event.key === 'ArrowUp' && hintIndex >= 0) {
        hintIndex--;
    } else if (event.key === 'ArrowDown' && hintIndex < hints.length - 1) {
        hintIndex++;
    }

    updateHintHighlight();
    const selectedHint = hints[hintIndex];
    if(selectedHint)
        updateSearchBarValue(selectedHint.textContent);
});

function hintContainerSetup() {
    const hintsContainer = document.getElementById('search-hints-div');
    const hints = document.querySelectorAll('hint-div');

    function handleArrowKeys(event) {
        if (event.key === 'ArrowUp' && hintIndex >= 0) {
            hintIndex--;
        } else if (event.key === 'ArrowDown' && hintIndex < hints.length - 1) {
            hintIndex++;
        }

        updateHintHighlight();
        if (hintIndex !== -1) {
            const selectedHint = hints[hintIndex];
            updateSearchBarValue(selectedHint.textContent);
        } else {
            updateSearchBarValue('');
            hintsContainer.innerHTML = ''
        }
    }

    hintsContainer.addEventListener('keydown', handleArrowKeys);
}

function searchbarSetup() {
    const searchbar = document.getElementById('institution_search_bar');
    searchbar.addEventListener('input', hintInstitutions);
    searchbar.addEventListener('submit', fetchInstitutionResults(searchbar.value));
}

function updateSearchBarValue(newValue) {
    document.getElementById('institution_search_bar').value = newValue;
}

function updateHintHighlight() {
    const hintsContainer = document.getElementById('search-hints-div');
    const hints = hintsContainer.querySelectorAll('.hint-div');

    hints.forEach((hint, i) => {
        if (i === hintIndex) {
            hint.classList.add('highlight');
        } else {
            hint.classList.remove('highlight');
        }
    });
}

async function hintInstitutions() {
    const keyword = document.getElementById('institution_search_bar').value;
    const hintsContainer = document.getElementById('search-hints-div');

    if (keyword.length === 0) {
        hintsContainer.innerHTML = '';
        return;
    }

    const response = await fetch(`/institution_search_bar?q=${keyword}`);
    const data = await response.json();

    hintsContainer.innerHTML = '';

    data.forEach(result => {
        const hintElement = document.createElement('div');
        hintElement.textContent = result;
        hintElement.className = 'hint-div';

        hintElement.addEventListener('click', () => {
            document.getElementById('institution_search_bar').value = result;
            fetchInstitutionResults(result);
        });

        hintElement.addEventListener('mouseover', () => {
            updateSearchBarValue(hintElement.textContent);
            hintIndex = Array.from(hintsContainer.querySelectorAll('.hint-div')).indexOf(hintElement);
            updateHintHighlight();
        });

        hintElement.addEventListener('mouseout', () => {
            hintIndex = -1;
            updateHintHighlight();
        });

        hintsContainer.append(hintElement);
    });
}

async function fetchInstitutionResults(institution_name) {
    const response = await fetch(`/institution_results?q=${institution_name}`);
    const data = await response.json();

    data.forEach(element => {
        console.log(element);
    });

    setChartData(data);
}

/*
    chartsy do innego pliku?
*/

function setChartData(data) {
    var bar_chart_canvas = document.getElementById('bar-chart');
    var bar_chart = Chart.getChart(bar_chart_canvas);

    var doughnut_chart_canvas = document.getElementById('doughnut-chart');
    var doughnut_chart = Chart.getChart(doughnut_chart_canvas);

    var labels = data.map(function(item) {
        return item.name;
    });

    var values = data.map(function(item) {
        return item.num_of_votes;
    });

    bar_chart.data.labels = labels;
    bar_chart.data.datasets[0].data = values;

    doughnut_chart.data.labels = labels;
    doughnut_chart.data.datasets[0].data = values;

    doughnut_chart.update();
    bar_chart.update();
}


function chartSetup() {
    const bar_chart_canvas = document.getElementById('bar-chart');
    const doughnut_chart_canvas = document.getElementById('doughnut-chart');
    
    const makoColors = [
        "#00819D",
        "#3E6990",
        "#C17900",
        "#C88D00",
        "#00A08A",
        "#00B7A2",
        "#5A2D46",
        "#AFBFB2",
        "#FFE227",
        "#FFD74A",
        "#F05A28",
        "#F27D46"
      ];

    new Chart(bar_chart_canvas, {
        type: 'bar',
        data: {
            labels: [],  // Initially empty labels
            datasets: [{
                data: [],   // Initially empty data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: false // Disable tooltips
                },
                legend: {
                    display: false // Hide the legend
                }
            },
        }
    });

    new Chart(doughnut_chart_canvas, {
        type: 'doughnut',
        data: {
            labels: [],  // Initially empty labels
            datasets: [{
                data: [],   // Initially empty data
                //backgroundcolor: lightcol
                backgroundColor: makoColors,
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: false // Disable tooltips
                },
                legend: {
                    display: false // Hide the legend
                }
            },
        }
    });
}

/*
    var lightColors = [
        "#FFD1DC", // Light Pink
        "#A0CED9", // Light Blue
        "#FFDD94", // Light Yellow
        "#B5E7A0", // Light Green
        "#FFABAB", // Light Coral
        "#A3D2E2", // Light Sky Blue
        "#FFD8B1", // Light Apricot
        "#C6F8E2", // Light Mint
        "#FFC3A0", // Light Salmon
        "#D1EAA3", // Light Pistachio
        "#FFC3A0", // Light Peach
        "#E2F0CB", // Light Lime
    ];
*/


/*
    czyscic searchbar kiedy nawigowal po hintsach i wrocil do poczatku
*/



/* zeby na poczatku bar byl pusty, przychodzi api call i sie wypelniaja barsy!
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dynamic Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <canvas id="myChart" width="400" height="200"></canvas>
    <button id="fetchData">Fetch Data</button>

    <script>
        const ctx = document.getElementById('myChart').getContext('2d');
        
        // Initialize an empty chart
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Data',
                    data: [],
                    backgroundColor: [],
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Function to update chart data with new data
        function updateChart(labels, data, backgroundColor) {
            myChart.data.labels = labels;
            myChart.data.datasets[0].data = data;
            myChart.data.datasets[0].backgroundColor = backgroundColor;
            myChart.update();
        }

        // Event listener for fetching data
        document.getElementById('fetchData').addEventListener('click', () => {
            // Simulate API call with new data
            const newData = {
                labels: ['A', 'B', 'C', 'D', 'E'],
                data: [5, 8, 12, 6, 10],
                backgroundColor: ['red', 'blue', 'green', 'purple', 'orange'],
            };

            // Update the chart with the new data
            updateChart(newData.labels, newData.data, newData.backgroundColor);
        });
    </script>
</body>
</html>


*/