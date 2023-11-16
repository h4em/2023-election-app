const wrapper = document.querySelector('.charts-div');
const barChartCanvas = wrapper.querySelector('.bar-chart');
const doughnutChartCanvas = wrapper.querySelector('.doughnut-chart');

const committees = [
    {name: 'BS', color: "rgb(52, 45, 86)", imageSrc: '../img/BS.png'},
    {name: '3D', color: "rgb(84, 181, 136)", imageSrc: '../img/3D.png'},
    {name: 'NL', color: "rgb(134, 32, 98)", imageSrc: '../img/NL.png'},
    {name: 'PiS', color: "rgb(33, 57, 119)", imageSrc: '../img/PiS.png'},
    {name: 'Konfederacja', color: "rgb(254, 201, 14)", imageSrc: '../img/Konfederacja.png'},
    {name: 'KO', color: "rgb(214, 21, 65)", imageSrc: '../img/KO.png'},
    {name: 'PJJ', color: "rgb(237, 33, 39)", imageSrc: '../img/PJJ.png'},
    {name: 'DiP', color: "rgb(58, 53, 130)", imageSrc: '../img/DiP.png'},
    {name: 'NK', color: "rgb(26, 152, 146)", imageSrc: '../img/NK.png'},
    {name: 'AP', color: "rgb(188, 188, 188)", imageSrc: '../img/AP.png'},
    {name: 'RNP', color: "rgb(170, 30, 34)", imageSrc: '../img/RNP.png'},
    {name: 'MN', color: "rgb(255, 224, 0)", imageSrc: '../img/MN.png'},
];

function getColor(committeeName) {
    let committee = committees.find(element => element.name === committeeName);

    if (committee) {
        return committee.color;
    }

    return 'rgb(0, 0, 0)';
}

function getColorsArray(data) {
    let backgroundColors = [];

    data.forEach(element => {
        let color = getColor(element.name);
        backgroundColors.push(color);
    });

    return backgroundColors;
}

export function initCharts() {
    createEmptyBarChart();
    createEmptyDoughnutChart();
}

export function setChartData(data) {
    let chartLabels = [];
    let chartData = [];

    data.forEach(element => {
        chartLabels.push(element.name);
        chartData.push(element.num_of_votes);
    });

    let barChart = Chart.getChart(barChartCanvas);
    let doughnutChart = Chart.getChart(doughnutChartCanvas);

    //Set labels
    barChart.data.labels = chartLabels;
    doughnutChart.data.labels = chartLabels;
    
    //Set data
    barChart.data.datasets[0].data = chartData;
    doughnutChart.data.datasets[0].data = chartData;

    //Update bar chart Y axis range
    let minDataVal =  Math.min(...data);
    let maxDataVal =  Math.max(...data);
    barChart.options.scales.y.min = Math.floor(minDataVal / 10) * 10;
    barChart.options.scales.y.max = Math.ceil(maxDataVal / 10) * 10;

    //Set data colors
    let backgroundColors = getColorsArray(data);
    barChart.data.datasets[0].backgroundColor = backgroundColors;
    doughnutChart.data.datasets[0].backgroundColor = backgroundColors;

    //Enable tooltips for doughnut chart
    doughnutChart.options.plugins.tooltip.enabled = true;

    barChart.update();
    doughnutChart.update();
}

function createEmptyBarChart() {
    const ctx = barChartCanvas.getContext('2d');

    const config = {
        type: 'bar',

        data: {
            labels: [],
            datasets: [{
                data: [],
            }]
        },

        options: {
            maintainAspectRatio: false,
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

function createEmptyDoughnutChart() {
    const ctx = doughnutChartCanvas.getContext('2d');

    const config = {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [1]
            }]
        },
        
        options: {
            plugins: {
                fullsize: true,
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    };

    new Chart(ctx, config);
}

/*
    ogolnie w po updacie danych rozmiar canvasow sie nie zmniejsza (300x300 zostaje)
    ale zaczyna includowac w tym legende/opisy osi wiec defacto rozmiar wykresow
    sie zmniejsza.
*/