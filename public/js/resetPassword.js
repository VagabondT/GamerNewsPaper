

$("#updatePassbtn").click(()=>{

    const pass = $("#passwordInput").val();
    const cpass = $("#passwordConfirmInput").val();

    if (pass == cpass && pass.length >=8){
        updatePassword(pass, cpass)
    }
})

const updatePassword = async (password, confirmPassword) =>{
    const postURL = window.location.origin + '/api/account/resetPassword/' + $("#updatePassbtn").attr("value")
    try{
        const response = await axios({
            method: 'PATCH',
            url: postURL,
            data: {
                Password: password,
                ConfirmPassword: confirmPassword
            }
            
        })

        if (response.data.status === 'success'){
            window.setTimeout(() => {
                location = window.location.origin + '/login'
            }, 1500);
        }
    }catch (err){
        alert(err);

    }
}


const sendForgotEmail = async (email) =>{
    const postURL = window.location.origin + '/api/account/forgotPassword'
    try{
        const response = await axios({
            method: 'POST',
            url: postURL,
            data:{
                Email: email
            }
            
        })

        if (response.data.status === 'success'){
            window.setTimeout(() => {
                location = window.location.origin + '/'
            }, 1500);
        }
    }catch (err){
        alert(err);

    }
}

$("#forgotPassbtn").click(() =>{
    const userEmail = $("#forgotEmail").val();
    alert(userEmail)
    if (userEmail.length>0){
        sendForgotEmail(userEmail);
    }
})