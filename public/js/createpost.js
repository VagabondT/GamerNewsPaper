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

const sendNewPost = async () =>{
    const postTitle = 'Test from Quill';
    const postContent = editor.getContents();
    const category = '6422f07a1b289c2c8568010b';

    const postURL = `http://localhost:6868/create`
    try{
        const response = await axios({
            method: 'POST',
            url: postURL,
            data: {
                Title: postTitle,
                Content: postContent,
                Category:category
            }
        })

        if (response.data.status === 'success'){
            window.setTimeout(() => {
                location = '/'
            }, 1500);
        }
    }catch (err){
        alert(err.response.data.message);

    }
}

$("#submitButon").click(()=>{
    sendNewPost();
})
