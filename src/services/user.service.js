import axios from "axios"

const API_URL = "https://localhost:7210/User"

axios.defaults.withCredentials = true

const api = axios.create({
    responseType: 'json',
    timeout: 10000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
    validateStatus(status) {
        return status >= 200 && status < 300;//default
    }
})

function getUsers(id) {
    if (!id) {
        return api({
            url: API_URL + '/GetList',
            method: 'get',
        }).then(res => res.data);
    }//nie działa lista 
    else {
        return api({
            url: API_URL + `/Get/${id}`,
            method: 'get',
            params: {
                id: id
            }
        }).then(res => res.data);
    }
};


const UserService = {
    getUsers
}

export default UserService