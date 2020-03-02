$(document).ready(function () {
    showTime();
    $('.sidebar.icon').click(function () {
        $('.ui.sidebar').sidebar({
            context: $('.bottom.segment')
        }).sidebar('setting', 'transition', 'push')
        .sidebar('toggle');
    });
    ;
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