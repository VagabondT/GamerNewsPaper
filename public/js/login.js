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
    const postURL = `http://localhost:6868/api/account/login`
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
            window.setTimeout(() => {
                location = '/'
            }, 1500);
        }
    }catch (err){
        alert(err.response.data.message);

    }
}


$(".submitButton").click(()=>{
    if (!isEmpty($("#inputIdUsrname").val()) && !isEmpty($("#inputIdPassword").val())){
        sendLogin();
    }
})

