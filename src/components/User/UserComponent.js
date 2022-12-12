import React from "react";
import { Form } from "react-bootstrap";
import { Button } from 'react-bootstrap'
import userService from "../../services/user.service";
//<label htmlFor='filterByName'>Find the skill you are looking for: </label>
//<input type='text' id='filterByName' onChange={this.filterSkills}></input>
class UserComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            users: []
        }

        this.handleGetUsers = this.handleGetUsers.bind(this)
        this.handleIdChange = this.handleIdChange.bind(this)
        this.handleDeleteUser = this.handleDeleteUser.bind(this)
    }
    handleIdChange(e) {
        this.setState({
            id: e.target.value
        })
    }
    handleGetUsers(e) {
        e.preventDefault()

        userService.getUsers(this.state.id)
            .then(res => {
                this.setState({
                    users: res

                });
            })
    }
    handleDeleteUser(e) {
        e.preventDefault()
        userService.deleteUser(this.state.id).then(res => console.log(res))
    }


    render() {
        console.log(this.state.users)
        return (
            <div>
                <Form onSubmit={this.handleGetUsers}>
                    <Form.Group className="mb-3">
                        <Form.Label>Get user specified by id</Form.Label>
                        <Form.Control type="number" onChange={this.handleIdChange}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>

                <Form onSubmit={this.handleDeleteUser}>
                    <Form.Group className="mb-3">
                        <Form.Label>Delete user specified by id</Form.Label>
                        <Form.Control type="number" onChange={this.handleIdChange}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>

                {JSON.stringify(this.state.users)}
            </div>

        )
    }
}

export default UserComponent