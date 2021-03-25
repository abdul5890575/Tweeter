
$(document).ready(function () {
    $("#tweet-text").on("keyup", function () {
        let len = ($(this).val().length)
        let count = 140 - len;
        $(this).siblings(".formbottom").children(".counter").text(count);

        if (count < 0) {
           $(this).siblings(".formbottom").children(".counter").addClass("counter2")
        } else if (count >= 0) {
            $(this).siblings(".formbottom").children(".counter").removeClass("counter2")
        }
    })
});


