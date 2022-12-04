import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7210/Candidate/',
    timeout: 10000,
    responseType: 'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
});

const formHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data',
}

function createCandidate(form) {
    return axiosInstance({
        url: 'Create',
        method: 'post',
        data: form,
        headers: formHeaders
    })
}

const candidateService = {
    createCandidate
}

export default candidateService