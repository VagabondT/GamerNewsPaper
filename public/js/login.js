$("#inputIdUsrname").keyup(checkInputValid)
$("#inputIdPassword").keyup(checkInputValid)

function checkInputValid(){
    if ($("#inputIdUsrname").val() && $("#inputIdPassword").val() ){
        $(".submitButton").removeClass("submitButtonDisabled");
    }else{
        $(".submitButton").addClass("submitButtonDisabled");
    }
}

const isEmpty = str => !str.trim().length;




const sendLogin = async () =>{
    const user = $('#inputIdUsrname').val();
    const pwd = $('#inputIdPassword').val();
    const postURL = window.location.origin + `/api/account/login`
    try{
        const response = await axios({
            method: 'POST',
            url: postURL,
            data: {
                UserName: user,
                Password: pwd
            }
        })

        if (response.data.status === 'success'){
            $(".noticePara").html("Đăng nhập thành công! Đang chuyển hướng...")
            window.setTimeout(() => {
                location = '/'
            }, 1500);
        }
    }catch (err){
        alert(err);

    }
}

$(".submitButton").click(()=>{
    if (!isEmpty($("#inputIdUsrname").val()) && !isEmpty($("#inputIdPassword").val())){
        sendLogin();
    }
})

