

const sendLogout = async () =>{
    const postURL = window.location.origin + `/api/account/logout`
    try{
        const response = await axios({
            method: 'GET',
            url: postURL
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
  
  $("#logoutBtn").click((e)=>{
    e.preventDefault();
    sendLogout();
    console.log("clicked");
  })

  function UpdatePost(obj){
    
    const postURL = window.location.origin + `/updatePost/`+ obj.value;
    window.setTimeout(() => {
      location = postURL
    }, 1500);
  }

  const sendUpdatePost = async (id, status) =>{

    const postURL = window.location.origin + `/updatePost/`+ id;
    try{
        const response = await axios({
            method: 'PATCH',
            url: postURL,
            data: {
                Status: status
            }
        })

        window.setTimeout(() => {
            location.reload()
        }, 1500);
    }catch (err){
        alert(err);

    }
}

  function ApprovePost(obj){
    
    sendUpdatePost(obj.value,'publish')

  }

  function CancelPost(obj){
    
    sendUpdatePost(obj.value,'cancel')

  }

  function ReadPost(obj){
    
    setTimeout(() => {
      window.location = window.location.origin +'/preview/' + obj.value
    }, 1000);

  }


  var postID; 
  function DeletePost(obj){
    //- alert(obj.value)
    $(".modal-body").html("Đến lúc phải chọn rồi! Bạn có chắc là muốn xoá bài viết này chứ?")
    $("#exampleModalLabel").html("Xoá bài viết này?")
    $(".btn-secondary").html("Thôi từ từ đã...")
    $("#ConfirmModalBtn").html("Xoá luôn")
    $("#ConfirmModal").modal();
    postID = obj.value;
  }

  $("#ConfirmModalBtn").click(async function(e){
    e.preventDefault();
    const postURL = window.location.origin + `/api/posts/` + postID
    try{
        const response = await axios({
            method: 'DELETE',
            url: postURL
        })
  
        if (response.status == 204){
            alert("Đã xoá thành công!")
            window.setTimeout(() => {
                location.reload();
            }, 500);
        }
    }catch (err){
        alert(err);
    }
  })

