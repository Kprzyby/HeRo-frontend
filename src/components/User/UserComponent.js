import React from "react";
import { Button } from 'react-bootstrap'
import userService from "../../services/user.service";
import { PencilSquare } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons'
import EditUserComponent from './EditUserComponent';
class UserComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editedId: -1,
            users: []
        }

        this.handleGetUsers = this.handleGetUsers.bind(this)
        this.handleDeleteUser = this.handleDeleteUser.bind(this)
        this.editUser = this.editUser.bind(this);
        this.setEditedId = this.setEditedId.bind(this)
    }
    handleGetUsers(e) {
        e.preventDefault()

        userService.getUsers(this.state.id)
            .then(res => {
                this.setState({
                    users: res.userDTOs

                });
            })
    }
    setEditedId(event, id) {
        this.setState({
            editedId: id
        });
    }
    componentDidMount() {

        userService.getUsers(this.state.id)
            .then(res => {
                this.setState({
                    users: res.userDTOs

                });
            })

    }
    handleDeleteUser(e, id) {
        e.preventDefault()
        userService.deleteUser(id).then(res => {
            this.setState((state) => {
                return {
                    users: state.users.filter(u => u.id !== id)
                }
            })
        })

    }
    editUser(event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            userService.editUser(this.state.editedId, event.target.value)
                .then(res => {
                    const users = this.state.users.map((e) => {
                        if (e.id === this.state.editedId) {
                            return {
                                id: e.id,
                                name: event.target.value
                            }
                        }
                        else {
                            return e;
                        }
                    })

                    this.setState({
                        users: users,
                        editedId: -1
                    })
                })
        }
    }

    render() {
        console.log(this.state.users)
        return (
            <div>
                <table>
                    <thead>
                        {this.state.users.length !== 0 ?
                            <tr>
                                <th>Id</th>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>User status</th>
                                <th>Role name</th>
                            </tr>
                            : <tr></tr>}
                    </thead>
                    <tbody>
                        {this.state.users.length !== 0 ? this.state.users.map(u => {
                            return (
                                <tr key={u.id}>
                                    <td>
                                       {u.id}
                                    </td>
                                    <td>
                                        <EditUserComponent name={u.fullName} editedId={this.state.editedId} id={u.id} editItem={this.editUser}></EditUserComponent>
                                    </td>
                                    <td>
                                        <EditUserComponent name={u.email} editedId={this.state.editedId} id={u.id} editItem={this.editUser}></EditUserComponent>
                                    </td>
                                    <td>
                                        <EditUserComponent name={u.userStatus} editedId={this.state.editedId} id={u.id} editItem={this.editUser}></EditUserComponent>
                                    </td>
                                    <td>
                                        <EditUserComponent name={u.roleName} editedId={this.state.editedId} id={u.id} editItem={this.editUser}></EditUserComponent>
                                    </td>
                                    <td>
                                        <Button variant="success" onClick={(event) => this.setEditedId(event, u.id)}>
                                            <PencilSquare></PencilSquare>
                                        </Button>
                                        <Button variant='danger' onClick={(event) => this.handleDeleteUser(event, u.id)}>
                                            <Trash></Trash>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }) : <tr></tr>
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}
export default UserComponent