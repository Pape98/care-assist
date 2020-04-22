// Global Variables
var yellow = '#FFD700';
var blue = '#0E6EB8';


// Function Definitions

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateDataSet(size, max) {
    var data = [];
    for (let i = 0; i < size + 1; i++) {
        data.push(getRandomInt(max));
    }
    return data;
}

function generateAxisLabel(start, end, increment) {
    labels = [];
    for (let i = start; i < end + 1; i = i + increment) {
        var label = (i).toString()
        labels.push(label);
    }
    return labels;
}

function formatBirthDate() {
    var dateString = $('#birthdayDisplay').text()
    dateString = new Date(dateString).toUTCString();
    dateString = dateString.split(' ').slice(0, 4).join(' ');

    $('#birthdayDisplay').text(dateString);
}


function drawHeartRateChart() {
    if (!($('#heartRateChart').length)) return;
    var ctx = $('#heartRateChart');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: generateAxisLabel(0, 10, 1),
            datasets: [{
                label: 'Data 1',
                borderColor: yellow,
                data: generateDataSet(10, 100),
                fill: false,
            }],
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Heart Rate'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    });
}

function drawHinOutChart() {
    if (!($('#inOutChart').length)) return;
    var ctx1 = $('#inOutChart');

    var myChart2 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Outpatients',
                backgroundColor: blue,
                data: generateDataSet(7, 30),
            }, {
                label: 'Inpatients',
                backgroundColor: yellow,
                data: generateDataSet(7, 30),
            }],
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Patients'
                    }
                }]
            }
        }
    });

}

function drawGenderChart() {
    if (!($('#genderChart').length)) return;
    var ctx3 = $('#genderChart');

    var myChart2 = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: 'Gender',
                backgroundColor: [blue, yellow],
                data: generateDataSet(1, 40),
            }],
            labels: [
                'Male',
                'Female'
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}


$(document).ready(function () {
    formatBirthDate();
    drawHeartRateChart();
    drawHinOutChart();
    drawGenderChart();
});