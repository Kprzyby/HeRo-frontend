import React from "react";
import { Form } from "react-bootstrap";
import { Button } from 'react-bootstrap'
import AuthService from "../../../services/auth.service";

class CreateNewUserComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            surname: "",
            email: "",
            password: "",
            secondPassword: "",
            passwordError: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSurnameChange = this.handleSurnameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this)
    }
    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleSurnameChange(e) {
        this.setState({
            surname: e.target.value
        })
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleSecondPasswordChange(e) {
        this.setState({
            secondPassword: e.target.value
        })
        if (e.target.value !== this.state.password) {
            this.setState({
                passwordError: true
            })
        }
        else {
            this.setState({
                passwordError: false
            })
        }

    }

    handleSubmit(e) {
        e.preventDefault()

        AuthService.createUser(
            this.state.name,
            this.state.surname,
            this.state.email,
            this.state.password,
            this.state.secondPassword
        ).then(res => console.log(res))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={this.handleNameChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" onChange={this.handleSurnameChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={this.handleEmailChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={this.handlePasswordChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Repeate password</Form.Label>
                    <Form.Control type="password" onChange={this.handleSecondPasswordChange} isInvalid={this.state.passwordError}></Form.Control>
                    <Form.Control.Feedback type="invalid">Please type correct password!</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }
}

export default CreateNewUserComponent