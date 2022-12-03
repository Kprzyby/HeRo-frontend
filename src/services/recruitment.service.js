import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7210/Recruitment/',
    timeout: 10000,
    responseType:'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
});
function getPublicRecruitments

const recruitmentService={

}

export default recruitmentService;