$(document).ready(function () {
    showTime();
/**
* For tabs
*/
    $('.menu .item')
  .tab()
;

/**
* For accordion
*/
$('.ui.accordion')
  .accordion()
;

/**
* For sidebar menu
*/
    $('.sidebar.icon').click(function () {
        $('.ui.sidebar').sidebar({
            context: $('.bottom.segment')
        }).sidebar('setting', 'transition', 'push')
        .sidebar('toggle');
    });
    ;
});

/**
* For select dropdowns
*/

$('.ui.dropdown')
  .dropdown()
;

/**
 * For Buttons in New Patient Form
 */
var url = window.location.href;
if(url.includes('/patients/new')){
    $('.emergency').hide();
    $('.health').hide();
    $('.review').hide();

    $('#healthtNext').hide();
    $('#reviewNext').hide();
    $('#submitButton').hide();
    
    
}

$('#emergencytNext').click(function(){
    $(this).hide();
    $('.personal').hide();

    $('.step.one').removeClass('active').addClass('completed');
    $('.step.two').addClass('active');

    $('.emergency').show();
    $('#healthtNext').show();

  

});

$('#healthtNext').click(function(){
    $(this).hide();
    $('.emergency').hide();

    $('.step.two').removeClass('active').addClass('completed');
    $('.step.three').addClass('active');


    $('.health').show();
    $('#reviewNext').show();
});

$('#reviewNext').click(function () { 
    $(this).hide();
    $('.step.three').removeClass('active').addClass('completed');
    
    $('.personal').show();
    $('.emergency').show();

    $('.review').show();
    $('#submitButton').show();
});

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