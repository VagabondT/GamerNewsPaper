$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      items: 2,
      nav: true,
      responsive : {
        0 : {
          items: 1
        },

        510 :{
          items: 2
        },

        960 : {
          items: 2
        },

        1280 : {
          items: 2
        }
      }
    }
    );

    $(".owl-prev").append('<svg class="navCarouselIcon" viewBox="0 0 100 100"><path d="M100 43v14H36v22L0 50l36-29v22h64z" class="arrow"></path></svg>')
    $(".owl-next").append('<svg class="navCarouselIcon" viewBox="0 0 100 100" data-selected="true" data-label-id="0" data-metatip="true"><path d="M100 43v14H36v22L0 50l36-29v22h64z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg>')

  });

  $(".searchBarBox").attr("style","background:#333333 !important;border: 1px solid #333333 !important;");


let AlignStyle = Quill.import('attributors/style/align')
let BackgroundStyle = Quill.import('attributors/style/background')
let ColorStyle = Quill.import('attributors/style/color')
let DirectionStyle = Quill.import('attributors/style/direction')
let FontStyle = Quill.import('attributors/style/font')
let SizeStyle = Quill.import('attributors/style/size')    

Quill.register(AlignStyle, true);
Quill.register(BackgroundStyle, true);
Quill.register(ColorStyle, true);
Quill.register(DirectionStyle, true);
Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);


var quill = new Quill();

quill.ready(()=>{
  var justHtml = editor.root.innerHTML;
  $("#postContentHere").html(justHtml)
})
  
