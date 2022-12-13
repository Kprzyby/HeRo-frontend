import axios from "axios";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

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
    }).then(res => res.data)
}

function getCandidate(id) {
    return axiosInstance({
        url: `Get/${id}`,
        method: 'get'
    }).then(res => res.data)
}

function deleteCandidate(id) {
    return axiosInstance({
        url: `Delete/${id}`,
        method: 'delete'
    }).then(res => res.data)
}

function editCandidate(form) {
    return axiosInstance({
        url: 'Edit',
        method: 'post',
        data: form,
        headers: formHeaders
    }).then(res => res.data)
}

function getCandidates(filteringInfo) {
    return axiosInstance({
        url: 'GetList',
        method: 'post',
        data: filteringInfo
    }).then(res => res.data)
}

function getCV(candidateId) {
    return axiosInstance({
        url: `GetCV/${candidateId}`,
        method: 'get',
        responseType: 'arraybuffer',
        headers: {
            'Accept': 'application/pdf'
          }
    }).then(res => {
        var file = new Blob([res.data], { type: 'application/pdf' })
        return file
    })
}

function getStatusList() {
    return axiosInstance({
        url: 'GetStatusList',
        method: 'get'
    }).then(res => res.data)
}

function getStageList() {
    return axiosInstance({
        url: 'GetStageList',
        method: 'get'
    }).then(res => res.data)
}

const candidateService = {
    createCandidate,
    getCandidates,
    getCV,
    editCandidate,
    getCandidate,
    getStatusList,
    getStageList,
    deleteCandidate
}

export default candidateService