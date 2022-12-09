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
            filteringInfo:{
                email: "",
                userStatus: "",
                roleName: true,
                pageNumber: 1,
                sortOrder: "ASC"
              },
            id: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleIdChange = this.handleIdChange.bind(this)

    }
    handleIdChange(e) {
        this.setState({
            id: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        userService.getUsers(
            this.state.id

        ).then(res => console.log(res))
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Get user specified by id</Form.Label>
                        <Form.Control type="number" onChange={this.handleIdChange}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                <table>
                    <thead>
                        <tr>
                            <th>Nr</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>


        )
    }
}

export default UserComponent