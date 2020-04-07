// Global Variables
var yellow = '#FFD700'



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
    console.log(dateString)
    dateString = new Date(dateString).toUTCString();
    dateString = dateString.split(' ').slice(0, 4).join(' ');
    
    $('#birthdayDisplay').text(dateString);
}

// Function Calls



$(document).ready(function () {
    formatBirthDate();
    
    var ctx = $('#myChart');

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

});