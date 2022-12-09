import axios from "axios"

const API_URL = "https://localhost:7210/Auth"

axios.defaults.withCredentials = true

const api = axios.create({
    responseType: 'json',
    timeout: 10000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
    validateStatus(status){
        return status >= 200 && status < 300;//default
    }
})

const createUser = (name, surname, email, password, secondPassword) => {
    return api.post(API_URL + '/CreateNewUser', {
        name,
        surname,
        email,
        password,
        secondPassword
    }).then(res => res.data)
}

const login = (email, password) => {
    return api.post(API_URL + "/SignIn", {
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
    return api.get(API_URL + "/LogOut")
    .then((response) => {
        console.log(response.status)
    })
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

const AuthService = {
    createUser,
    login,
    logout,
    getCurrentUser
}

export default AuthService