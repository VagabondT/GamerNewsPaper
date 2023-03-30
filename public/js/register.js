$("#inputIdUsrname").keyup(checkInputValid)
$("#inputIdPassword").keyup(checkInputValid)

function checkInputValid(){
    if ($("#inputIdUsrname").val() && $("#inputIdPassword").val() && $("#inputIdPasswordConfirm").val() ){
        $(".submitButton").removeClass("submitButtonDisabled");
    }else{
        $(".submitButton").addClass("submitButtonDisabled");
    }
}

const isEmpty = str => !str.trim().length;




$(".submitButton").click(()=>{
    if (!isEmpty($("#inputIdUsrname").val()) && !isEmpty($("#inputIdPassword").val())){

    }
})

