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

$(".logoutBtn").click(()=>{
    sendLogout();
})