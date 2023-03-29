
var openNavbarMobile = document.getElementsByClassName("menuIcon")[0];
var rightHeader = document.getElementsByClassName("rightHeader")[0];
var closeNavbarMobile = document.getElementById("close-btn");

openNavbarMobile.addEventListener("click", function() {
    rightHeader.style.display= "flex";
    $("#left-header-content-close").trigger("click");
    $(".FakeBackGround").show();


});

closeNavbarMobile.addEventListener("click",()=>{
    rightHeader.style.display= "none";
    $(".FakeBackGround").hide();
});

$("#rightHeaderLink1").click(()=>{
    $(".rightHeaderSubContent").addClass("importantRules");
})

$("#close-btn2").click(()=>{
    $(".rightHeaderSubContent").removeClass("importantRules");
    $(".rightHeader").css("display","none")
    $(".FakeBackGround").hide();
})

$("#rightHeaderLink2").click(()=>{
    $(".rightHeaderSubContent2").addClass("importantRules");

})

$("#close-btn-3").click(()=>{
    $(".rightHeaderSubContent2").removeClass("importantRules");
    $("body").removeClass("offOverflow");
    $(".rightHeader").css("display","none")
    $(".FakeBackGround").hide();
})


$("#homeLogo1").click(()=>{
    $(".rightHeaderSubContent").removeClass("importantRules");

})

$("#homeLogo2").click(()=>{
    $(".rightHeaderSubContent2").removeClass("importantRules");
})


var headerOffset = $(".header").offset().top;
$(window).bind("scroll", function() {
    var offset = $(this).scrollTop();

    if (offset > headerOffset ) {
        $(".header").addClass("fixedPos");
        $(".searchBarBox").addClass("searchBarBoxColor");
        $("#searchInp").addClass("searchBarBoxInputColor");
    }else{
        $(".header").removeClass("fixedPos");
        $(".searchBarBox").removeClass("searchBarBoxColor");
        $("#searchInp").removeClass("searchBarBoxInputColor");
    }
});
$(".FakeBackGround").hide();
$("#appSwitcher").click(()=>{
    $(".leftHeaderContent").addClass("displayFlexClass");
    rightHeader.style.display= "none";
    $("body").addClass("offOverflow");
    $(".FakeBackGround").show();

})

$("#appSwitcher2").click(()=>{
    $(".leftHeaderContent").removeClass("displayFlexClass");
    rightHeader.style.display= "none";
    $("body").removeClass("offOverflow");
    $(".FakeBackGround").hide();
})

$("#left-header-content-close").click(()=>{
    $(".leftHeaderContent").removeClass("displayFlexClass");
    $("body").removeClass("offOverflow");
    $(".FakeBackGround").hide();
})

// Scroll to top
$(".topLink").click(()=>{
    $("html, body").animate({ scrollTop: 0 }, "fast");
})

// HeaderLink
$(".FakeBackGround").click(()=>{
    $("#left-header-content-close").trigger("click");
    $("#close-btn-3").trigger("click");
    $("#close-btn-2").trigger("click");
})


$(".leftTagItemsSubContent").mouseover((e)=>{

    let EleIdLink = e.currentTarget.id.toString();
    let EleIdNum = EleIdLink.slice(4);
    let eleIdNumType = parseInt(EleIdNum);

    for(let i=0; i <= 20; i++){
        $("#Card"+i).hide();
    }
    $("#Card"+eleIdNumType).show();
})

$(".leftTagItemsSubContent").mouseout((e)=>{
    let EleIdLink = e.currentTarget.id.toString();
    let EleIdNum = EleIdLink.slice(4);
    let eleIdNumType = parseInt(EleIdNum);
    $("#Card"+eleIdNumType).hide();    
    $("#Card0").show();

})

// Lay het element con co chung class 
$('.leftTagItemsSubContent').each(function(i) {
    let j = i+1;
    $(this).attr("id","Link"+j);
});


$('.rightTagWrapper').each(function(i) {
    $(this).attr("id","Card"+i);
    $("#Card"+i).hide();
});

$("#Card0").show();




$(window).resize(function(){
    var width = $(window).width(); 

    if ((width >= 960 )) {
        $(".leftTagItemsContent").show();
    }
    else {
        $(".leftTagItemsContent").hide();
        
        $(".leftTagItems").click((e)=>{
            $(".leftTagItems").find(".leftTagItemsContent").hide();
            $(e.currentTarget).find(".leftTagItemsContent").show();
        
        })
    }
});

// HeaderLogo
$(".homeLogo").click(()=>{
    window.location.href = "/";
})


$("#newsRightHeader").click(()=>{
    window.location.href = "/news";
})

$("#loginRightHeader").click(()=>{
    window.location.href = "./login";
})


function featuredLink(id){
    window.location.href = "./news/" + id;
}