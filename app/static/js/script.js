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
            // fetchInstitutionResults(result);
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

/*

chartsy do innego pliku?

*/


function chartSetup() {
    const ctx = document.getElementById('chart').getContext('2d');
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: [1200, 1500, 1700, 1300, 1600, 1800],
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)',     // Border color
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

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