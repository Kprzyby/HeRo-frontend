import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7210/Skill/',
    timeout: 10000,
    responseType:'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
});

function getSkills(name){
    if(!name){
        return axiosInstance({
            url:'GetList',
            method:'get',
        })
        .then(res=>res.data);
    }
    else{
        return axiosInstance({
            url:'GetListFilteredByName',
            method:'get',
            params:{
                name:name
            }
        })
        .then(res=>res.data);
    }
}
function addSkill(name){
    return axiosInstance({
        url:'Create',
        method:'put',
        params:{skillName: name}
    });
}
function deleteSkill(id){
    return axiosInstance({
        url:`Delete/${id}`,
        method:'delete',
        params:{
            skillId:id
        }
    });
}
function updateSkill(id, newName){
    return axiosInstance({
        url:`Update/${id}`,
        method:'put',
        params:{
            skillId:id,
            newSkillName:newName
        }
    });
}

const skillService={
    getSkills,
    addSkill,
    deleteSkill,
    updateSkill
};

export default skillService;