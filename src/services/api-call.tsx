import { IUserDetails } from "../def/domain";
import axios from 'axios';


export const verifyLoginCredentials = async (userDetails: IUserDetails) => {
    const url = `${'https://nit-jsr-lms-service.herokuapp.com/resultLoggin'}${'?regNo='}${userDetails.regNo}${'&password='}${userDetails.password}`;
    const headers = {
        "Content-Type": "application/json",
        //"authorization" ""
    }

    axios.get(url, {
        headers: headers,
    })
    .then((response) => {
        if(response && response.data){
            if(response.data.status === 200){
                return true;
            }
        }
    })
    .catch((error) => {
        return false;
    });

}