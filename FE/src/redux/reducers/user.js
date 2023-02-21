const initialState = {
    user : {
        id:"",
        nama_depan:"",
        nama_belakang:"",
        email:"",
        alamat:"",
        token:""
    },
    isLoading: false
}

const userReducer = (state=initialState, action) =>{
    if(action.type === 'USER_LOGIN_PENDING'){
        return{
            ...state,
            isLoading : true
        } 
    } else if(action.type === 'USER_LOGIN_SUCCESS'){
        return{
            ...state,
            user:action.payload,
            isLoading : false
        } 
    } else {
        return state
    }
}

export default userReducer;