import React from "react";
import styles from './CandidateComponent.module.css'
import candidateService from "../../services/candidate.service";
import CreateCandidateComponent from "./CreateCandidateComponent/CreateCandidateComponent";

class CandidateComponent extends React.Component {
    render() {
        return (
            <CreateCandidateComponent recruitmentId={1}/>
        )
    }
}

export default CandidateComponent