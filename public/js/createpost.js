var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [ 'link', 'image', 'video', 'formula' ],          // add's image support
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];


var editor = new Quill('#editor', {
    modules: { toolbar: toolbarOptions },
    theme: 'snow',
});

function test(){

    var html = editor.root.innerHTML;
    document.getElementById("NoticePara").innerHTML = html;
}
var optionValue = $('input[type=radio][name=Category]').val();
$('input[type=radio][name=Category]').change(function() {
    console.log(this.value);
    optionValue = this.value;
  });
  
  var countFocus = 0;
  
  //Close Switch
  $('.select-box__current').on('click', function() {
    if ($(this).is(':focus')) {
      countFocus++;
      if (countFocus == 2) {
        this.blur();
        countFocus = 0;
      }
    }
  });

const sendNewPost = async () =>{
    const postTitle = $("#inputTitle").val();
    const postContent = editor.getContents();
    const category = optionValue;
    const description = editor.getText().slice(0,60) + '....';

    const postURL = `http://localhost:6868/create`
    try{
        const response = await axios({
            method: 'POST',
            url: postURL,
            data: {
                Title: postTitle,
                Content: postContent,
                Category: category,
                Description: description
            }
        })

        if (response.data.status === 'success'){
            window.setTimeout(() => {
                location = '/'
            }, 1500);
        }
    }catch (err){
        alert(err);

    }
}

$("#submitButon").click(()=>{
    sendNewPost();
})
