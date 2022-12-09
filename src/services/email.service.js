import axios from "axios"

const API_URL = "https://localhost:7210/Email"

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

const addSmtpAccount = (port, name, login, password, sender, host) => {
    return api.post(API_URL + '/AddSmtpAccount', {
        port,
        name,
        login,
        password,
        sender,
        host
    }).then(res => res.data)
}

const addImapAccount = (port, host, login, password) => {
    return api.post(API_URL + '/AddImapAccount', {
        port,
        host,
        login,
        password,
    }).then(res => res.data)
}

const EmailService = {
    addSmtpAccount,
    addImapAccount
}

export default EmailService
