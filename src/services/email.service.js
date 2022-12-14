import axios from "axios"


axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: 'https://localhost:7210/Email/',
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

function addSmtpAccount(port, name, login, password, sender, host) {
    return api.post('AddSmtpAccount', {
        port,
        name,
        login,
        password,
        sender,
        host
    }).then(res => res.data)
}


function addImapAccount(port, host, login, password) {
    return api.post('AddImapAccount', {
        port,
        host,
        login,
        password,
    }).then(res => res.data)
}

function getAllPossibleSmtpAccountNames() {
    return api.post('GetAllPossibleSmtpAccountNames').then(res => res.data)

}

function getAllMails() {
    return api.post('GetAllMails').then(res => res.data)

}

const emailService = {
    addSmtpAccount,
    addImapAccount,
    getAllPossibleSmtpAccountNames,
    getAllMails
}

export default emailService
