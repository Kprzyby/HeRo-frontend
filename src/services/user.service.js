import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7210/User/',
    timeout: 10000,
    responseType: 'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
})

function deleteUser(id) {
    return api({
        url: `Delete/${id}`,
        method: 'delete'
    }).then(res => res.data)
}

function getRecruiters() {
    return api({
        url: 'GetRecruiters',
        method: 'post'
    }).then(res => res.data);
}

function getTechnicians() {
    return api({
        url: 'GetTechnicians',
        method: 'post'
    }).then(res => res.data);
}


function editUser(id, _name, _surname, _userStatus, _roleName) {
    return api({
        url: `Edit/${id}`,
        method: 'post',
        data: {
            name: _name,
            surname: _surname,
            userStatus: _userStatus,
            roleName: _roleName
        }
    });
}

function getUsers(id) {
    if (!id) {
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
    else {
        return api({
            url: `Get/${id}`,
            method: 'get',
            params: {
                id: id
            }
        }).then(res => res.data);
    }
}

const userService = {
    getUsers,
    deleteUser,
    editUser,
    getRecruiters,
    getTechnicians
}

export default userService