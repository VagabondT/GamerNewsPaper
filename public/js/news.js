
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

function prettyDate(dateString){
    //if it's already a date object and not a string you don't need this line:
    var date = new Date(dateString);
    var d = date.getDate();
    var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();
    return d+' '+m+' '+y;
}

console.log(prettyDate("2023-03-26T06:54:41.785+00:00"))