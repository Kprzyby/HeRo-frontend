import axios from "axios";

const axiosInstance=axios.create({
    baseURL:'https://localhost:7210/Report/',
    timeout:10000,
    responseType:'json',
    headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
});

function countNewCandidates(from, to, recruitmentIds){
    const reportViewModel={
        Ids:recruitmentIds,
        FromDate:from,
        ToDate:to
    };

    return axiosInstance({
        url:'CountNewCandidates',
        method:'post',
        data:reportViewModel
    }).then(res=>res.data);
}
function getPopularRecruitments(){
    return axiosInstance({
        url:'GetPopularRecruitments',
        method:'get',
    }).then(res=>res.data);
}
function getRequestedSkills(){
    return axiosInstance({
        url:'GetRequestedSkills',
        method:'get'
    }).then(res=>res.data);
}

const reportService={
    countNewCandidates,
    getPopularRecruitments,
    getRequestedSkills
};

export default reportService;