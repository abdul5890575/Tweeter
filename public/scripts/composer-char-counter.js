
$(document).ready(function () {
    $("#tweet-text").on("keyup", function () {
        let len = ($(this).val().length)
        let count = 10 - len;
        $(this).siblings(".formbottom").children(".counter").text(count);

        if (count < 0) {
            console.log('aaaa')
            $(this).siblings(".formbottom").children(".counter").toggleClass(".counter2")
        }
    })
});


// / $(this).parent();
//     console.log(this.parent())

// $("h2").siblings("p");