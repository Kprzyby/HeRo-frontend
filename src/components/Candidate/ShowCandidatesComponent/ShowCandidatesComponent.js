import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Badge, Container, ListGroup, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useLocation, useParams } from "react-router-dom";
import candidateService from "../../../services/candidate.service";

function ShowCandidatesComponent(props) {
    const id = useParams().id
    const [recruitmentId] = useState(id)
    const [candidatesList, setList] = useState([])
    const [selectedCandidate, setSelected] = useState(0)

    useEffect(() => {
        candidateService.getCandidates(
            getFilteringInfo()
        ).then(res => {
            setList(res.candidateInfoForListDTOs)
        })

        function getFilteringInfo() {
            const filteringInfo = {
                recruitmentId: recruitmentId,
                status: [],
                stage: [],
                paging: {
                    pageSize: 5,
                    pageNumber: 1
                },
                sortOrder: {
                    sort: [{
                        key: 'Name',
                        value: 'DESC'
                    }]
                }
            }
            return filteringInfo
        }

    }, [recruitmentId])
    //console.log(candidatesList)

    function handleClick(e, id) {
        selectedCandidate === id ? setSelected(0) : setSelected(id)
    }

    function getBadgeColor(status) {
        if(status === 'NEW') return 'info'
        else if(status === 'IN_PROCESSING') return 'warning'
        else if(status === 'DROPPED_OUT') return 'danger'
        else if(status === 'HIREd') return 'success'
    }

    return (
        <Container>
            <Row>
                <Col>
                    <ListGroup as='ul'>
                        {candidatesList.map(can => {
                            return (
                                <ListGroup.Item
                                    className='d-flex justify-content-between align-items-center'
                                    key={can.id} as='li'
                                    onClick={f => handleClick(f, can.id)}
                                    action
                                    active={selectedCandidate === can.id}
                                >
                                    <div className='ms-2 me-auto'>
                                        {can.name}
                                    </div>
                                    <div className='vr me-auto' />
                                    <div className='me-auto'>
                                        Stage:<b> {can.stage}</b>
                                    </div>
                                    <Badge bg={getBadgeColor(can.status)} pill>
                                        {can.status}
                                    </Badge>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Col>
                {selectedCandidate === 0
                    ? '' :
                    <Col>
                        <p></p>
                    </Col>}
            </Row>


        </Container>

    )
}

export default ShowCandidatesComponent