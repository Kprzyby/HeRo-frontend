import React from "react";
import { Form } from "react-bootstrap";
import { Button } from 'react-bootstrap'
import EmailService from "../../../services/email.service";

class AddSmtpAccountComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            port: "",
            name: "",
            login: "",
            password: "",
            sender: "",
            host: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePortChange = this.handlePortChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSenderChange = this.handleSenderChange.bind(this)
        this.handleHostChange = this.handleHostChange.bind(this)
    }
    handlePortChange(e) {
        this.setState({
            port: e.target.value
        })
    }
    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleLoginChange(e) {
        this.setState({
            login: e.target.value
        })
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleSenderChange(e) {
        this.setState({
            sender: e.target.value
        })
    }
    handleHostChange(e) {
        this.setState({
            host: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        EmailService.addSmtpAccount(
            this.state.port,
            this.state.name,
            this.state.login,
            this.state.password,
            this.state.sender,
            this.state.host
        ).then(res => console.log(res))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Port</Form.Label>
                    <Form.Control type="number" onChange={this.handlePortChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={this.handleNameChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" onChange={this.handleLoginChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={this.handlePasswordChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Sender</Form.Label>
                    <Form.Control type="text" onChange={this.handleSenderChange}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Host</Form.Label>
                    <Form.Control type="text" onChange={this.handleHostChange}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }
}

export default AddSmtpAccountComponent