import api from "./api";

async function authVerify(){
    const auth: any = await api.get('/pingAuth')
    .then((response: any)=>{
        return response
    })
    .catch(error=>{
        return error.response
    })
    return auth.data.auth
}

export default authVerify