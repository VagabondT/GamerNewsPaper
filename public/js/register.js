$("#inputIdUsrname").keyup(checkInputValid)
$("#inputIdPassword").keyup(checkInputValid)
$("#inputIdPasswordConfirm").keyup(checkInputValid)
$("#inputEmail").keyup(checkInputValid);

function checkInputValid(){
    if ($("#inputIdUsrname").val() && $("#inputIdPassword").val() && $("#inputIdPasswordConfirm").val() && $("#inputEmail").val() ){
        $(".submitButton").removeClass("submitButtonDisabled");
    }else{
        $(".submitButton").addClass("submitButtonDisabled");
    }
}

const isEmpty = str => !str.trim().length;

const sendRegister = async ()=>{
    const user = $('#inputIdUsrname').val();
    const pwd = $('#inputIdPassword').val();
    const email = $("#inputEmail").val();
    const pwdConfirm = $("#inputIdPasswordConfirm").val();
    const postURL = `http://localhost:6868/api/account/signup`
    try{
        const response = await axios({
            method: 'POST',
            url: postURL,
            data: {
                UserName: user,
                Password: pwd,
                ConfirmPassword: pwdConfirm,
                Email: email
            }
        })

        if (response.data.status === 'success'){
            $(".noticePara").html("Đăng ký thành công! Đang chuyển hướng...")
            window.setTimeout(() => {
                location = '/updateUser'
            }, 1500);
        }
    }catch (err){
        alert(err);
    }
}

$(".submitButton").click(()=>{
    if (!isEmpty($("#inputIdUsrname").val()) 
    && !isEmpty($("#inputIdPassword").val()) 
    && !isEmpty($("#inputIdPasswordConfirm").val()) 
    && !isEmpty($("#inputEmail").val()) ){
    
        sendRegister();
    }
})

