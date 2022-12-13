import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7210/Interview/',
    timeout: 10000,
    responseType: 'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
})

function getInterview(id) {
    return api({
        url: `Get/${id}`,
        method: 'get'
    }).then(res => res.data)

}

function getInterviewList() {
    return api({
        url: 'GetList',
        method: 'post',
        data: {
            paging: {
                pageSize: 10,
                pageNumber: 1
            }
        }
    }).then(res => res.data);
}
function createInterview(candidateId, workerId) {
    return api({
        url: 'Create',
        method: 'post',
        data: {
            candidateId: candidateId,
            workerId: workerId,
            type: "tech_interview"
        }
    }).then(res => res.data);
}

function editInterview(id, data, wId, typ) {
    return api({
        url: `Edit/${id}`,
        method: 'post',
        data: {
            date: data,
            workerId: wId,
            type: typ
        }
    }).then(res => res.data)
}

function deleteInterview(id) {
    return api({
        url: `Delete/${id}`,
        method: 'delete'
    }).then(res => res.data)
}

const interviewService = {
    getInterview,
    getInterviewList,
    createInterview,
    editInterview,
    deleteInterview
}

export default interviewService