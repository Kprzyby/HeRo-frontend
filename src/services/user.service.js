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
        method: 'delete',
        params: {
            userId: id
        }
    });
}
function getRecruiters(){
    return api({
        url:'GetRecruiters',
        method:'post'
    })
    .then(res=>res.data);
}

function editUser(id, name, surname, userStatus, roleName) {
    return api({
        url: `Edit/${id}`,
        method: 'post',
        params: {
            userId: id,
            userName: name,
            userSurname: surname,
            userUserStatus: userStatus,
            userRoleName: roleName

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
    getRecruiters
}

export default userService