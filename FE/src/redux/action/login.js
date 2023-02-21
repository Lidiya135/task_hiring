import axios from "axios";
import swal from "sweetalert";

export const  loginUser = (data,navigate) => async (dispact) =>{
    try{
        dispact({type:"USER_LOGIN_PENDING"});
        const result = await axios.post("http://localhost:3000/users/login",data);
        const user = result.data.data;
        localStorage.setItem("token",user.token);
        dispact({type:"USER_LOGIN_SUCCESS",payload: user});
        swal("Success", "Login success", "success");
        navigate('/home');
        console.log("user login success");
    } catch(err){
        console.log("user login err");
        console.log(err);
        swal("Warning", "Login failed", "error");
    }
}