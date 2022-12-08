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

function getRecruitment(id){
    return axiosInstance({
        url:`Get/${id}`,
        method:'get',
        params:{
            recruitmentId:id
        }
    })
    .then(res=>res.data);
}
function getRecruitments(filteringInfo){
    const recruitmentListFilterViewModel={
        name: filteringInfo.name,
        description: filteringInfo.description,
        showOpen: filteringInfo.showOpen,
        showClosed: filteringInfo.showClosed,
        beginningDate: filteringInfo.beginningDate,
        endingDate: filteringInfo.endingDate,
        paging: {
          pageSize: 5,
          pageNumber: filteringInfo.pageNumber
        },
        sortOrder: {
          sort: [
            {
              key: "Name",
              value: filteringInfo.sortOrder
            }
          ]
        }
    }
    return axiosInstance({
        url:'GetPublicList',
        method:'post',
        data:recruitmentListFilterViewModel
    })
    .then(res=>res.data);
}
function createRecruitment(newRecruitmentInfo){
    const newRecruitment={
        beginningDate: newRecruitmentInfo.beginningDate,
        endingDate: newRecruitmentInfo.endingDate,
        name: newRecruitmentInfo.name,
        description: newRecruitmentInfo.description,
        recruiterId: newRecruitmentInfo.recruiterId,
        recruitmentPosition: newRecruitmentInfo.recruitmentPosition,
        localization: newRecruitmentInfo.localization,
        seniority: newRecruitmentInfo.seniority,
        isPublic: true,
        skills: newRecruitmentInfo.skills
    };

    return axiosInstance({
        url:'Create',
        method:'post',
        data:newRecruitment
    });
}
function editRecruitment(editRecruitmentInfo){
    const recruitment={
        beginningDate: editRecruitmentInfo.beginningDate,
        endingDate: editRecruitmentInfo.endingDate,
        name: editRecruitmentInfo.name,
        description: editRecruitmentInfo.description,
        recruiterId: editRecruitmentInfo.recruiterId,
        recruitmentPosition: editRecruitmentInfo.recruitmentPosition,
        localization: editRecruitmentInfo.localization,
        seniority: editRecruitmentInfo.seniority,
        isPublic: true,
        skills: editRecruitmentInfo.skills
    }
    return axiosInstance({
        url:`Edit/${editRecruitmentInfo.id}`,
        method:'post',
        data:recruitment,
        params:{
            recruitmentId:editRecruitmentInfo.id
        }
    });
}
function endRecruitment(id){
    return axiosInstance({
        url:`End/${id}`,
        method:'get',
        params:{
            recruitmentId:id
        }
    });
}
function deleteRecruitment(id){
    return axiosInstance({
        url:`Delete/${id}`,
        method:'get',
        params:{
            recruitmentId:id
        }
    });
}

const recruitmentService={
    getRecruitment,
    getRecruitments,
    createRecruitment,
    editRecruitment,
    endRecruitment,
    deleteRecruitment
}

export default recruitmentService;