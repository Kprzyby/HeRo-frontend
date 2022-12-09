import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7210/User/',
    timeout: 10000,
    responseType:'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
})

function getUsers(id) {
    if (!id) {
        return api({
            url: 'GetList',
            method: 'get',
        }).then(res => res.data);
    }//nie działa lista 
    else {
        return api({
            url: `/Get/${id}`,
            method: 'get',
            params: {
                id: id
            }
        }).then(res => res.data);
    }
};

function getRecruiters(){
    return axiosInstance({
        url:'GetRecruiters',
        method:'post'
    })
    .then(res=>res.data);
}

const userService = {
    getUsers,
    getRecruiters
}

export default userService