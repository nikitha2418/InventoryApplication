import axios from 'axios';
 
const LOGIN_URL='http://localhost:9898/inventory/login'
const ROLE_URL='http://localhost:9898/inventory/role'
 
export const registerNewUser = (user) => {
    return axios.post(LOGIN_URL, user);
}
 
 export const validateUser = (userId,password) => {
    return axios.get(LOGIN_URL+ '/' + userId+'/'+password);
}

export const getSingleUserDetails = () => {
    return axios.get(LOGIN_URL);
}
 
export const getUsersByRole=(role)=>{
    return axios.get(LOGIN_URL+'/'+role);
}

export const getUserRole=()=>{
    return axios.get(ROLE_URL);
}