const wrapper = document.querySelector('.charts-div');
const barChart = wrapper.querySelector('.bar-chart');
//const doughnutChart = wrapper.querySelector('.doughnut-chart');

// const committees = [
//     {shortname: 'BS', color: "rgb(52, 45, 86)", imageSrc: },
//     {shortname: '3D', color: "rgb(84, 181, 136)", imageSrc: },
//     {shortname: 'NL', color: "rgb(134, 32, 98)", imageSrc: },
//     {shortname: 'PiS', color: "rgb(33, 57, 119)", imageSrc: },
//     {shortname: 'Konfederacja', color: "rgb(254, 201, 14)", imageSrc: },
//     {shortname: 'KO', color: "rgb(214, 21, 65)", imageSrc: },
//     {shortname: 'PJJ', color: "rgb(237, 33, 39)", imageSrc: },
//     {shortname: 'DiP', color: "rgb(58, 53, 130)", imageSrc: },
//     {shortname: 'NK', color: "rgb(26, 152, 146)", imageSrc: },
//     {shortname: 'AP', color: "rgb(188, 188, 188)", imageSrc: },
//     {shortname: 'RNP', color: "rgb(170, 30, 34)", imageSrc: },
//     {shortname: 'MN', color: "rgb(255, 224, 0)", imageSrc: },
// ];

export function initCharts(){
    createEmptyBarChart();
    //createEmptyDoughnutChart();
}

function createEmptyBarChart() {
    const ctx = barChart.getContext('2d');

    const config = {
        type: 'bar',

        data: {
            labels: [],  
            datasets: [{
                data: [], 
                backgroundColor: 'transparent',
                borderColor: 'rgba(34, 177, 76)',
                borderWidth: 1
            }]
        },

        options: {
            responsive: true,
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                fullsize: true,
                legend: {
                    display: false
                }
            }
        }
    }

    new Chart(ctx, config);
}

/*zeby zmieniac size chyba trzeba dodac wrappera dla obu chartow i tam zmieniac:
    <div class="chart-container" style="position: relative; height:40vh; width:80vw">
        <canvas id="chart"></canvas>
    </div>

    chart.canvas.parentNode.style.height = '128px';
    chart.canvas.parentNode.style.width = '128px';

/*





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