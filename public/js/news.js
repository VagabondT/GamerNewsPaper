
var gridItems = $(".gridItem").offset().top;
$(window).bind("scroll", function() {
    var offset = $(this).scrollTop();
    if (offset >= gridItems-800 ) {
        if (!$(".gridItem").hasClass("loadAnimation")){
            $(".gridItem").addClass("loadAnimation");
        }
    }
});

$('.header').attr("style","background-color: #0A0A0A !important;")

$(".searchBarBox").attr("style","background:#333333 !important;border: 1px solid #333333 !important;");