import axios from "axios";
import swal from "sweetalert";

export const  registerUser = (data,navigate) => async (dispact) =>{
    try{
        dispact({type:"REGISTER_LOGIN_PENDING"})
        const result = await axios.post("http://localhost:3007/users/register",data)
        const user = result.data.data
        console.log(user);
        dispact({type:"USER_REGISTER_SUCCESS",payload: user});
        swal("Success", "Register success", "success");
        navigate('/login')
        console.log("user register success");
    } catch(err){
        console.log("user register err");
        console.log(err);
        swal("Warning", "Register failed", "error");
    }
}