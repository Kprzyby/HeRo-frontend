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
\
function getUsers(id) {
    if (!id) {  //nie działa lista 
        return api({
            url: 'GetList',
            method: 'post',
            params: {
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
    deleteUser
}

export default userService