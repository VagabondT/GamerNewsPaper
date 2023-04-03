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

  const sendUpdateAccount = async (id,role) =>{

    const postURL = window.location.origin + `/api/account/`+ id;
    try{
        const response = await axios({
            method: 'PATCH',
            url: postURL,
            data: {
                Role:role
            }
        })

        window.setTimeout(() => {
            location.reload()
        }, 1500);
    }catch (err){
        alert(err);

    }
}

  function MakeUser(obj){
    
    sendUpdateAccount(obj.value,'user')

  }

  function MakeEditor(obj){
    
    sendUpdateAccount(obj.value,'editor')

  }
  function MakeModer(obj){
    
    sendUpdateAccount(obj.value,'moderator')

  }


  var postID; 
  function DeleteAccount(obj){
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
    const postURL = window.location.origin + `/api/account/` + postID
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