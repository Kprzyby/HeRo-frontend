import React from "react";
import styles from './CandidateComponent.module.css'
import CreateCandidateComponent from "./CreateCandidateComponent/CreateCandidateComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function CandidateComponent(props) {
    const id = useLocation().state.id
    const navigate = useNavigate()
    const redirect = (e) => {
        navigate('/recruitments')
    }
    return (
        <CreateCandidateComponent recruitmentId={id} redirect={redirect}/>
    )

}

export default CandidateComponent