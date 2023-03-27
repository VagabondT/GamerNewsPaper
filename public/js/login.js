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


async function sendRefreshToken(){
    try{
        const response = await fetch('http://localhost:6969/refresh',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        if (!response.ok){
            if (response.status === 401){
                return response.json();

            }
            return response.json();
            // throw new Error(`${response.status} ${response.statusText}`);
        }

        return await response.json();
    }catch (err){
        console.log(err);

    }
}

const sendLogin = async () =>{
    const user = $('#inputIdUsrname').val();
    const pwd = $('#inputIdPassword').val();

    try{
        const response = await fetch('http://localhost:6969/auth',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({user,pwd})
        });
        if (!response.ok){
            if (response.status === 401){
                return await sendRefreshToken();

            }
            return response;
            // throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
    }catch (err){
        console.log(err);

    }
}


$(".submitButton").click(()=>{
    if (!isEmpty($("#inputIdUsrname").val()) && !isEmpty($("#inputIdPassword").val())){
        sendLogin().then((data) =>{
            console.log(data);
            localStorage.setItem('accessToken', data.accessToken)
            if (data.msg){
                $(".noticePara").text(data.msg);
            }
            else{
                var akiHeader = new Headers();
                akiHeader.append('Content-Type', 'application/json');
                akiHeader.append('Authorization','Bearer '+ localStorage.getItem('accessToken'))
                fetch('http://localhost:6969/',{
                    method: 'GET',
                    credentials: 'include',
                    headers: akiHeader

                })
            }
        
        }, (err)=>{
            if (err) {
                
            }
        })
    }
})

