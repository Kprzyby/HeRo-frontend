import React from 'react';
import styles from './CreateCandidateComponent.module.css'
import createCandidate from "../../../services/candidate.service";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types';

class CreateCandidateComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recruitmentId: props.recruitmentId,
            validated: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        this.setState({
            validated: true
        })
    }


    render() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit} >
                <Form.Group className='mb-3' controlId='formName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter first name'
                    />
                    <Form.Control.Feedback type="invalid">Please enter first name!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formLastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter last name'
                    />
                    <Form.Control.Feedback type="invalid">Please enter last name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email' />
                    <Form.Control.Feedback type="invalid">Please enter email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formNumber'>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter phone number' />
                    <Form.Control.Feedback type="invalid">Please enter phone number!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formAvailable'>
                    <Form.Label>Available from</Form.Label>
                    <Form.Control
                        required
                        type='datetime-local'
                    />
                    <Form.Control.Feedback type="invalid">Please pick a date!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formSalary'>
                    <Form.Label>Expected salary</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter expected salary' />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formExpectations'>
                    <Form.Label>Other expectations</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter other expectations' />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formCV'>
                    <Form.Label>Your CV</Form.Label>
                    <Form.Control
                        required
                        type='file'
                        placeholder='Pick a file' />
                    <Form.Control.Feedback type="invalid">Please pick a file!</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Apply
                </Button>
            </Form>
        )
    }


}

CreateCandidateComponent.propTypes = {
    recruitmentId: PropTypes.number.isRequired
}
CreateCandidateComponent.defaultProps = {}

export default CreateCandidateComponent