import React from "react";
import { Button } from 'react-bootstrap'
import interviewService from "../../services/interview.service";
import { PencilSquare } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons'
import EditInterviewComponent from './EditInterview/EditInterviewComponent';

class InterviewComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            interviews: [],
            editedId: -1
        }
        this.handleDeleteInterview = this.handleDeleteInterview.bind(this)
    }
    setEditedId(event, id) {
        this.setState({
            editedId: id
        });
    }

    componentDidMount() {
        interviewService.getInterviewList()
            .then(res => {
                this.setState({
                    interviews: res.interviewDTOs
                });
            })
    }
    handleDeleteInterview(e, id) {
        e.preventDefault()
        interviewService.deleteInterview(id).then(res => {
            this.setState((state) => {
                return {
                    interviews: state.interviews.filter(u => u.interviewId !== id)
                }
            })
        })
    }


    render() {
        return (
            <div>
                <table>
                    <thead>
                        {this.state.interviews.length !== 0 ?
                            <tr>
                                <th>Interview Id</th>
                                <th>Candidate Email</th>
                                <th>Candidate Id</th>
                                <th>Candidate Last Name</th>
                                <th>Candidate Name</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Worker Email</th>
                                <th>Worker Id</th>
                            </tr>
                            :
                            <tr>
                                <th>
                                    pusto
                                </th>

                            </tr>}
                    </thead>
                    <tbody>
                        {this.state.interviews.length !== 0 ? this.state.interviews.map(u => {
                            return (
                                <tr key={u.interviewId}>
                                    <td>
                                        {u.interviewId}
                                    </td>
                                    <td>
                                        {u.candidateEmail}
                                    </td>
                                    <td>
                                        {u.candidateId}
                                    </td>
                                    <td>
                                        {u.candidateLastName}
                                    </td>
                                    <td>
                                        {u.candidateName}
                                    </td>
                                    <td>
                                        {u.candidateStatus}
                                    </td>
                                    <td>
                                        {u.date}
                                    </td>
                                    <td>
                                        {u.type}
                                    </td>
                                    <td>
                                        {u.workerEmail}
                                    </td>
                                    <td>
                                        {u.workerId}
                                    </td>
                                    <td>
                                        <Button variant="success" onClick={(event) => this.setEditedId(event, u.interviewId)}>
                                            <PencilSquare></PencilSquare>
                                        </Button>
                                        <Button variant='danger' onClick={(event) => this.handleDeleteInterview(event, u.interviewId)}>
                                            <Trash></Trash>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }) :
                            <tr>
                                <td>
                                    puste dane
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}
InterviewComponent.propTypes = {};

InterviewComponent.defaultProps = {};


export default InterviewComponent