// Global Variables
var yellow = '#FFD700';
var blue = '#0E6EB8';


// Function Definitions

function getRandomInt(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}



function generateDataSet(size, max) {
    var data = [];
    for (let i = 0; i < size + 1; i++) {
        data.push(getRandomInt(10,50));
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

async function getHeartRateArray(UID) {
    const resp = await fetch('/api/patients/' + UID)
    const data = await resp.json()
    return data;
}



function drawHeartRateChart(UID) {
    var heartRate = Promise.resolve(getHeartRateArray(UID));
    heartRate.then(async function (HeartRateData) {
        var data = HeartRateData[0].heart_rate;
        if (!($('#heartRateChart').length)) return;
        var ctx = $('#heartRateChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: generateAxisLabel(60, 80, 1),
                datasets: [{
                    label: 'Heart Rate in BPM',
                    borderColor: yellow,
                    data: data,
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
                        display: false,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Beats Per minutes'
                        }
                    }]
                }
            }
        });
    });
}

function stringToFloat(data) {
    temp = []
    data.forEach(function (d) {
        temp.push(parseFloat(d));
    });
    return temp;
}

function drawAccelerometerChart(UID) {
    var accelerometer = Promise.resolve(getHeartRateArray(UID));
    accelerometer.then(async function (accelerometerData) {
        var dataX = accelerometerData[0].accelerometerX;
        var dataY = accelerometerData[0].accelerometerY;
        var dataZ = accelerometerData[0].accelerometerZ;
        if (!($('#acceleroChart').length)) return;
        var ctx = $('#acceleroChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: generateAxisLabel(-30, 100, 1),
                datasets: [{
                        label: 'X' ,
                        borderColor: blue,
                        data: dataX,
                        fill: false,
                    },{
                        label: 'Y',
                        borderColor: yellow,
                        data: dataY,
                        fill: false,
                    },{
                        label: 'Z',
                        borderColor: 'red',
                        data: dataZ,
                        fill: false,
                    },

                ],
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Acceleration'
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
                        display: false,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        }
                    }]
                }
            }
        });
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


function startLoader(){
    $('.ui .text .loader').addClass('active');
    $('.ui .dimmer').addClass('active');
}

function stopLoader(){
    $('.ui .text .loader').removeClass('active');
    $('.ui .dimmer').removeClass('active');
}



$(document).ready(function () {
    formatBirthDate();
    drawHinOutChart();
    drawGenderChart();
});