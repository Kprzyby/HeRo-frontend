import React from "react";
import PropTypes from "prop-types";
import styles from './CandidateDetailsComponent.module.css'
import { Col, Badge, Container, ListGroup, Row, Tab, Tabs, Card, Form, Button } from "react-bootstrap";
import { FileEarmarkText, XSquare, PencilSquare, CheckSquare } from 'react-bootstrap-icons';
import candidateService from "../../../services/candidate.service";
import interviewService from "../../../services/interview.service";
import userService from "../../../services/user.service";

class CandidateDetailsComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            candidateData: props.candidate,
            statusList: [],
            stageList: [],
            recruiters: [],
            availableFrom: '',
            email: '',
            expectedMonthlySalary: 0,
            name: '',
            lastName: '',
            hrName: '',
            hrOpinionScore: null,
            hrOpinionText: null,
            id: 0,
            interviewName: '',
            interviewOpinionScore: null,
            interviewOpinionText: null,
            otherExpectations: '',
            phoneNumber: '',
            status: props.candidate.status,
            stage: props.candidate.stage,
            editDataFlag: true
        }

        this.updateData = this.updateData.bind(this)
        this.fetchCV = this.fetchCV.bind(this)
        this.enableEdit = this.enableEdit.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteCandidate = this.deleteCandidate.bind(this)
        this.createInterview = this.createInterview.bind(this)
    }

    componentDidMount() {
        this.fetchData(this.state.candidateData.id)
        candidateService.getStageList().then(res => {
            this.setState({
                stageList: res
            })
        })
        candidateService.getStatusList().then(res => {
            this.setState({
                statusList: res
            })
        })
        userService.getRecruiters().then(res => {
            this.setState({
                recruiters: res
            })
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (!(this.props.candidate.id === prevState.candidateData.id)) {
            this.updateData(this.props.candidate)
        }
    }
    fetchData(id) {
        candidateService.getCandidate(id).then(res => {
            this.setState({
                candidateDetails: res,
                availableFrom: res.availableFrom,
                email: res.email,
                expectedMonthlySalary: res.expectedMonthlySalary,
                name: res.fullName.split(' ')[0],
                lastName: res.fullName.split(' ')[1],
                hrName: res.hrName,
                hrOpinionScore: res.hrOpinionScore,
                hrOpinionText: res.hrOpinionText,
                id: res.id,
                interviewName: res.interviewName,
                interviewOpinionScore: res.interviewOpinionScore,
                interviewOpinionText: res.interviewOpinionText,
                otherExpectations: res.otherExpectations,
                phoneNumber: res.phoneNumber,
                editDataFlag: true
            })
        })
    }
    updateData(candidate) {
        this.fetchData(candidate.id)
        this.setState({
            candidateData: candidate,
        })
    }
    fetchCV(e) {
        candidateService.getCV(this.state.candidateData.id).then(res => {
            var fileURL = URL.createObjectURL(res)
            window.open(fileURL)
        })
    }
    enableEdit(e) {
        this.setState({
            editDataFlag: false
        })
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault()
        var form = new FormData(event.currentTarget)
        candidateService.editCandidate(form)
        this.setState({
            editDataFlag: true
        })
        this.props.childToParent('Update')
    }
    deleteCandidate() {
        candidateService.deleteCandidate(this.state.candidateData.id)
            .then(res => {
                this.props.childToParent('Delete')
            })
    }
    createInterview() {
        const workerId = this.state.recruiters.find(e => e.fullName === this.state.candidateData.recruiterAssignee)
        interviewService.createInterview(this.state.id, workerId.id)
    }

    render() {
        return (
            <Col sm={6}>
                <Card>
                    <Card.Body>
                        <Tabs
                            defaultActiveKey='details'
                            transition={true}
                        >
                            <Tab eventKey='details' title='Details'>
                                <Card.Text as='div' className='mt-4 ms-3 text-start'>
                                    <Row>
                                        <Col>
                                            <p><b>Name:</b> {this.state.candidateData.name}</p>
                                            <p><b>Recruitment:</b> {this.state.candidateData.recruitmentName}</p>
                                            <p><b>Status:</b> {this.state.candidateData.status}</p>
                                            <p><b>Stage:</b> {this.state.candidateData.stage}</p>
                                            <p><b>Recruiter:</b> {this.state.candidateData.recruiterAssignee}</p>
                                            <p><b>Technician:</b> {this.state.candidateData.techAssignee === ' ' ? 'None' : this.state.candidateData.techAssignee}</p>
                                            <div className='d-flex'><b className='me-2'>CV:</b> <Button className={styles.btnAlign} variant='success' onClick={this.fetchCV}><FileEarmarkText className='me-1' />View</Button></div>
                                        </Col>
                                        <Col>
                                            <p><b>Expected salary:</b> {this.state.expectedMonthlySalary}</p>
                                            <p><b>Available from:</b> {this.state.availableFrom}</p>
                                            <p><b>Phone number:</b> {this.state.phoneNumber}</p>
                                            <p><b>Email:</b> {this.state.email}</p>
                                            <p><b>Other expectations:</b> {this.state.otherExpectations}</p>
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Tab>
                            <Tab eventKey='edit' title='Edit'>
                                <Card.Text as='div' className='mt-4 text-start'>
                                    <Form onSubmit={this.handleSubmit}>
                                        <input name='candidateId' type='hidden' value={this.state.candidateData.id}></input>
                                        <Row>
                                            <Col>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>First name</Form.Label>
                                                    <Form.Control
                                                        name='name'
                                                        value={this.state.name}
                                                        onChange={this.handleInputChange}
                                                        disabled={this.state.editDataFlag}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Last name</Form.Label>
                                                    <Form.Control
                                                        name='lastName'
                                                        value={this.state.lastName}
                                                        onChange={this.handleInputChange}
                                                        disabled={this.state.editDataFlag}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        name='email'
                                                        value={this.state.email}
                                                        onChange={this.handleInputChange}
                                                        disabled={this.state.editDataFlag}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Phone number</Form.Label>
                                                    <Form.Control
                                                        name='phoneNumber'
                                                        value={this.state.phoneNumber}
                                                        onChange={this.handleInputChange}
                                                        disabled={this.state.editDataFlag}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Available from</Form.Label>
                                                    <Form.Control
                                                        name='availableFrom'
                                                        value={this.state.availableFrom}
                                                        onChange={this.handleInputChange}
                                                        type='datetime-local'
                                                        disabled={this.state.editDataFlag}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Expected salary</Form.Label>
                                                    <Form.Control
                                                        name='expectedMonthlySalary'
                                                        value={this.state.expectedMonthlySalary}
                                                        onChange={this.handleInputChange}
                                                        disabled={this.state.editDataFlag}></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Other expectations</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows='2'
                                                name='otherExpectations'
                                                value={this.state.otherExpectations}
                                                onChange={this.handleInputChange}
                                                disabled={this.state.editDataFlag}></Form.Control>
                                        </Form.Group>
                                        <Row>
                                            <Col>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Select
                                                        name='status'
                                                        value={this.state.status}
                                                        onChange={this.handleInputChange}
                                                        disabled={this.state.editDataFlag}>
                                                        {this.state.statusList.map(s => {
                                                            return (
                                                                <option key={s} value={s}>
                                                                    {s}
                                                                </option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Stage</Form.Label>
                                                    <Form.Select
                                                        name='stage'
                                                        value={this.state.stage}
                                                        onChange={this.handleInputChange}
                                                        disabled={this.state.editDataFlag}>
                                                        {this.state.stageList.map(s => {
                                                            return (
                                                                <option key={s} value={s}>
                                                                    {s}
                                                                </option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>CV</Form.Label>
                                            <Form.Control name='CV' type='file' disabled={this.state.editDataFlag} accept='.pdf'></Form.Control>
                                        </Form.Group>
                                        <div className='d-grid gap-2 d-md-flex'>
                                            <Button className={styles.btnAlign} variant='success' type='submit'><CheckSquare className='me-1' />Save</Button>
                                            <Button className={styles.btnAlign} onClick={this.enableEdit}><PencilSquare className='me-1' />Edit</Button>
                                        </div>
                                    </Form>
                                </Card.Text>
                            </Tab>
                            <Tab eventKey='manage' title='Manage'>
                                <Card.Text as='div' className='mt-4 text-start'>
                                    <Button onClick={this.createInterview} variant='success' className={styles.btnAlign}><XSquare className='me-1' />Create interview</Button>
                                    <br></br>
                                    <Button onClick={this.deleteCandidate} variant='danger' className={styles.btnAlign}><XSquare className='me-1' />Delete</Button>
                                </Card.Text>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </Col >
        )
    }
}

CandidateDetailsComponent.propTypes = {
}
CandidateDetailsComponent.defaultProps = {}

export default CandidateDetailsComponent