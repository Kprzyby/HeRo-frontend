import axios from "axios"

const API_URL = "https://localhost:7210"

axios.defaults.withCredentials = true

const api = axios.create({
    responseType: 'json',
    timeout: 10000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
})

const login = (email, password) => {
    return api.post(API_URL + "/Auth/SignIn", {
        email,
        password,
    })
        .then((response) => {
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
        }).catch(function (error) {
            console.log(error);
        });
}

const logout = () => {
    localStorage.removeItem("user")
    return api.get(API_URL + "/Auth/LogOut")
    .then((response) => {
        console.log(response.status)
    })
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

const AuthService = {
    login,
    logout,
    getCurrentUser
}

export default AuthService