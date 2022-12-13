import React from "react";
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap'
import userService from "../../services/user.service";
import { PencilSquare } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons'
import EditUserStatusComponent from './EditUser/EditUserStatusComponent';
import EditRoleNameComponent from './EditUser/EditRoleNameComponent';
import EditNameComponent from './EditUser/EditNameComponent';
class UserComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editedId: -1,
            users: []
        }

        this.handleGetUsers = this.handleGetUsers.bind(this)
        this.handleDeleteUser = this.handleDeleteUser.bind(this)
        this.editStatus = this.editStatus.bind(this);
        this.setEditedId = this.setEditedId.bind(this)
        this.editRole = this.editRole.bind(this)
        this.editName = this.editName.bind(this)
        
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
    editStatus(fullName, event, email, roleName) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const words = fullName.split(' ')

            userService.editUser(this.state.editedId, words[0], words[1], event.target.value, roleName)
                .then(res => {
                    const users = this.state.users.map((e) => {
                        if (e.id === this.state.editedId) {
                            return {
                                id: e.id,
                                email: email,
                                fullName: fullName,
                                userStatus: event.target.value,
                                roleName: roleName
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
    editRole(fullName, userStatus, email, event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const words = fullName.split(' ')

            userService.editUser(this.state.editedId, words[0], words[1], userStatus, event.target.value)
                .then(res => {
                    const users = this.state.users.map((e) => {
                        if (e.id === this.state.editedId) {
                            return {
                                id: e.id,
                                email: email,
                                fullName: fullName,
                                userStatus: userStatus,
                                roleName: event.target.value,
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
    editName(event, userStatus, email, roleName) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const words = event.target.value.split(' ')

            userService.editUser(this.state.editedId, words[0], words[1], userStatus, roleName)
                .then(res => {
                    const users = this.state.users.map((e) => {
                        if (e.id === this.state.editedId) {
                            return {
                                id: e.id,
                                email: email,
                                fullName: event.target.value,
                                userStatus: userStatus,
                                roleName: roleName,
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
                                        <EditNameComponent name={u.fullName} userStatus={u.userStatus} email={u.email} roleName={u.roleName} editedId={this.state.editedId} id={u.id} editName={this.editName}></EditNameComponent>
                                    </td>
                                    <td>
                                        {u.email}
                                    </td>
                                    <td>
                                        <EditUserStatusComponent name={u.fullName} userStatus={u.userStatus} email={u.email} roleName={u.roleName} editedId={this.state.editedId} id={u.id} editStatus={this.editStatus}></EditUserStatusComponent>
                                    </td>
                                    <td>
                                        <EditRoleNameComponent name={u.fullName} userStatus={u.userStatus} email={u.email} roleName={u.roleName} editedId={this.state.editedId} id={u.id} editRole={this.editRole}></EditRoleNameComponent>
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
UserComponent.propTypes = {};

UserComponent.defaultProps = {};

export default UserComponent