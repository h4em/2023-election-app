const searchbar = document.querySelector('#searchbar');
const hintContainer = document.querySelector('#searchbar-hints-div');
let searchbarInput = '';
let hintIndex = -1;

/*
    zrobic ze jak mouseout z hintContainera to w searchbarValue pokazuje sie 
    to co zaczal wpisywac zanim zaczal jezdzic po hintsach
*/

function resetHintIndex() {
    hintIndex = -1;
}

function hintContainerEmpty() {
    return hintContainer.childElementCount === 0;
}

function emptyHintsContainer() {
    hintContainer.innerHTML = '';
}

function updateSearchBarValue(newValue) {
    searchbar.value = newValue;
}

function clearSearchbar() {
    searchbar.value = '';
}

//jeszcze chart setup
function init() {
    setListeners();
    //initCharts();
}

function setListeners() {
    setSearchbarListeners();
    setHintContainerListeners();
}


window.addEventListener('load', init);

function toggleHintHiglight(hintElement) {
    hintElement.classList.toggle('highlight');
}

function hintContainerArrowKeyNav(event) {    
    const hints = hintContainer.querySelectorAll('.hint-div');
    
    if(hintIndex !== -1) {
        toggleHintHiglight(hints[hintIndex]);
    }

    if (event.key === 'ArrowUp' && hintIndex >= 0) {
        hintIndex--;
    } else if (event.key === 'ArrowDown' && hintIndex < hints.length - 1) {
        hintIndex++;
    }

    if(hintIndex !== hints.length - 1) {
        toggleHintHiglight(hints[hintIndex]);
    }
}

function setHintContainerListeners() {
    hintContainer.addEventListener('keydown', hintContainerArrowKeyNav);
    hintContainer.addEventListener('mouseleave', emptyHintsContainer);
    hintContainer.addEventListener('mouseleave', restoreSearchbarValue);
}

function restoreSearchbarValue() {
    searchbar.value = searchbarInput;
}

function saveSearchbarInput() {
    searchbarInput = searchbar.value;
}

function setSearchbarListeners() {
    searchbar.addEventListener('input', saveSearchbarInput);
    searchbar.addEventListener('input', hintInstitutions);
    searchbar.addEventListener('submit', fetchInstitutionResults(searchbar.value));
}

//tez do zmiany?
async function hintInstitutions() {
    const keyword = searchbar.value;

    if (keyword.length === 0) {
        emptyHintsContainer();
    }

    const response = await fetch(`/institution_search_bar?q=${keyword}`);
    const data = await response.json();

    emptyHintsContainer();

    data.forEach(result => {
        const hintElement = document.createElement('div');
        hintElement.textContent = result;
        hintElement.className = 'hint-div';

        hintElement.addEventListener('click', () => {
            document.getElementById('searchbar').value = result;
            fetchInstitutionResults(result);
        });

        hintElement.addEventListener('mouseover', () => {
            updateSearchBarValue(hintElement.textContent);
            hintIndex = Array.from(hintContainer.querySelectorAll('.hint-div')).indexOf(hintElement);
            toggleHintHiglight(hintElement);
        });

        hintElement.addEventListener('mouseout', () => {
            toggleHintHiglight(hintElement);
            resetHintIndex();
        });

        hintContainer.append(hintElement);
    });
}

async function fetchInstitutionResults(institution_name) {
    const response = await fetch(`/institution_results?q=${institution_name}`);
    const data = await response.json();

    data.forEach(element => {
        console.log(element);
    });

    //setChartData(data);
}

/*
    chartsy do innego pliku?
*/

// function setChartData(data) {
//     var bar_chart_canvas = document.getElementById('bar-chart');
//     var bar_chart = Chart.getChart(bar_chart_canvas);

//     var doughnut_chart_canvas = document.getElementById('doughnut-chart');
//     var doughnut_chart = Chart.getChart(doughnut_chart_canvas);

//     var labels = data.map(function(item) {
//         return item.name;
//     });

//     var values = data.map(function(item) {
//         return item.num_of_votes;
//     });

//     bar_chart.data.labels = labels;
//     bar_chart.data.datasets[0].data = values;

//     doughnut_chart.data.labels = labels;
//     doughnut_chart.data.datasets[0].data = values;

//     doughnut_chart.update();
//     bar_chart.update();
// }


// function chartSetup() {
//     const bar_chart_canvas = document.getElementById('bar-chart');
//     const doughnut_chart_canvas = document.getElementById('doughnut-chart');
    
//     const makoColors = [
//         "#00819D",
//         "#3E6990",
//         "#C17900",
//         "#C88D00",
//         "#00A08A",
//         "#00B7A2",
//         "#5A2D46",
//         "#AFBFB2",
//         "#FFE227",
//         "#FFD74A",
//         "#F05A28",
//         "#F27D46"
//       ];

//     new Chart(bar_chart_canvas, {
//         type: 'bar',
//         data: {
//             labels: [],  // Initially empty labels
//             datasets: [{
//                 data: [],   // Initially empty data
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 tooltip: {
//                      // Disable tooltips
//                 },
//                 legend: {
//                     display: false // Hide the legend
//                 }
//             },
//         }
//     });

//     new Chart(doughnut_chart_canvas, {
//         type: 'doughnut',
//         data: {
//             labels: [],  // Initially empty labels
//             datasets: [{
//                 data: [],   // Initially empty data
//                 //backgroundcolor: lightcol
//                 backgroundColor: makoColors,
//                 borderWidth: 1,
//             }]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 tooltip: {
//                 },
//                 legend: {
//                     display: false // Hide the legend
//                 }
//             },
//         }
//     });
// }

/*
    Best Practice: Using the DOMContentLoaded event is often considered a best practice for ensuring that your JavaScript runs at the right time, 
    regardless of where your scripts are placed. It can help make your code more robust and maintainable, especially in larger and more complex projects.
*/

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