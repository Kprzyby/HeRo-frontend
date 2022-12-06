import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7210/User/',
    timeout: 10000,
    responseType:'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
});

function getRecruiters(){
    return axiosInstance({
        url:'GetRecruiters',
        method:'post'
    })
    .then(res=>res.data);
}

const userService={
    getRecruiters
};

export default userService;
