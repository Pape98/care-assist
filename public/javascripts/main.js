

var url = window.location.href;

$(document).ready(function () {

    // Function Calls
    showTime();
    changeSelectedItem(url);
    selectGender();
    selectBloodType();
    newPatientForm();
    loader();
    makeInteractive();
    searchPatient();
    loginForm()
});

function loginForm() {
    $('#loginForm').form({
        fields: {
            email: {
                identifier: 'email',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your email'
                }]
            },
            password: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your password'
                }]
            }
        }
    });
}

function searchPatient() {

    $('.ui.search')
        .search({
            // change search endpoint to a custom endpoint by manipulating apiSettings
            apiSettings: {
                url: '/api/patients/search/?q={query}',
            },
        });

}

function makeInteractive() {
    $('.menu .item').tab();
    $('.ui.accordion').accordion();
    $('.ui.dropdown').dropdown();

    /** Close icon on message */
    $('.message .close')
        .on('click', function () {
            $(this)
                .closest('.message')
                .transition('fade');
        });
}


/**
 * Function to change active item in sidebar menu
 */
function changeSelectedItem(url) {
    if (url.includes('/patients/new')) {
        $('.add-patient-item').addClass('selected');
    } else if (url.includes('/patients/map')) {
        $('.map-item').addClass('selected');
    } else if (url.includes('/patients/')) {
        // Do nothing
    } else if (url.includes('/patients')) {
        $('.patient-list-item').addClass('selected');
    } else if (url.includes('/users/reminders')) {
        $('.reminder-item').addClass('selected');
    } else if (url.includes('/users/settings')) {
        $('.settings-item').addClass('selected');
    }
}
/**
 * Function used to display real time on main menu
 */
function showTime() {
    var clock = document.getElementById("MyClockDisplay");
    if (clock != null) {

        var date = new Date();
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59
        var s = date.getSeconds(); // 0 - 59
        var session = "AM";

        if (h == 0) {
            h = 12;
        }

        if (h > 12) {
            h = h - 12;
            session = "PM";
        }

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        var time = h + ":" + m + ":" + s + " " + session;

        clock.innerText = time;
        clock.textContent = time;

        setTimeout(showTime, 1000);
    }
}

function edit() {
    $('.ui.small.modal').modal({
        blurring: true
    }).modal('show');
}

function selectGender() {
    var dropdownGender = $('#dropdown-gender');
    var gender = dropdownGender.data('gender');
    dropdownGender.dropdown('set selected', gender);
}

function selectBloodType() {
    var dropdownBloodType = $('#dropdown-bloodType');
    var bloodType = dropdownBloodType.data('blood');
    dropdownBloodType.dropdown('set selected', bloodType);
}

function loader() {
    /**
     * Using timeout function to redirect to loader page then home page
     */
    function redirect_to_user_home() {
        window.location.href = '/users/home';
    }

    function redirect_to_landing() {
        window.location.href = '/';
    }

    if (url.includes('/login/loader')) {
        setTimeout(redirect_to_user_home, 1500);
    } else if (url.includes('/logout/loader')) {
        setTimeout(redirect_to_landing, 1500);
    }

}

function newPatientForm() {

    if (url.includes('/patients/new')) {
        $('.emergency').hide();
        $('.health').hide();
        $('.review').hide();
        $('#personalBack').hide();
        $('#emergencyBack').hide();
        $('#healthtNext').hide();
        $('#reviewNext').hide();
        $('#submitButton').hide();

    }

    /**
     * For NEXT Buttons in New Patient Form
     */

    $('#emergencytNext').click(function () {
        $(this).hide();
        $('.personal').hide();
        $('.step.one').removeClass('active').addClass('completed');
        $('.step.two').addClass('active');
        $('.emergency').show();
        $('#personalBack').show();
        $('#healthtNext').show();

    });

    $('#healthtNext').click(function () {
        $(this).hide();
        $('.emergency').hide();
        $('#personalBack').hide();
        $('.step.two').removeClass('active').addClass('completed');
        $('.step.three').addClass('active');
        $('.health').show();
        $('#reviewNext').show();
        $('#emergencyBack').show();

    });

    $('#reviewNext').click(function () {
        $(this).hide();
        $('.step.three').removeClass('active').addClass('completed');
        $('.personal').show();
        $('.emergency').show();
        $('.review').show();
        $('#submitButton').show();
        $('#emergencyBack').hide();
    });

    /**
     * For NEXT Buttons in New Patient Form
     */
    $('#personalBack').click(function () {
        $('.step.one').addClass('active').removeClass('completed');
        $('.step.two').removeClass('active');
        $(this).hide();
        $('#healthtNext').hide();
        $('.emergency').hide();
        $('.personal').show();
        $('#emergencytNext').show();
    });

    $('#emergencyBack').click(function () {
        $('.step.two').addClass('active').removeClass('completed');
        $('.step.three').removeClass('active');
        $(this).hide();
        $('#reviewNext').hide();
        $('.health').hide();

        $('.emergency').show();
        $('#healthtNext').show();
        $('#personalBack').show();
    });


    /** 
     * Patient Form Validation 
     * */

    $('#newPatientForm').form({
        fields: {
            first_name: {
                identifier: 'first_name',
                rules: [{
                    type: 'empty',
                    prompt: 'First Name field cannot be left empty.'
                }]
            },
            last_name: {
                identifier: 'last_name',
                rules: [{
                    type: 'empty',
                    prompt: 'Last Name field cannot be left empty.'
                }]
            }
        }
    });
}