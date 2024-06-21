import { AxiosResponse } from "axios";
import api from "./api";
import { Usuario } from "../components/ActivitiesTable/ActivitiesTable";
interface AxiosResponseData extends AxiosResponse{
    data: dataSuccess | dataError
}
interface dataSuccess{
    auth: boolean
    decoded: Usuario
}
interface dataError{
    auth: boolean
    message: string
}

async function authVerify(){
    const auth: AxiosResponseData = await api.get('/pingAuth')
    .then((response: AxiosResponseData)=>{
        return response
    })
    .catch(error=>{
        return error.response
    })
    return auth.data.auth
}

export default authVerify