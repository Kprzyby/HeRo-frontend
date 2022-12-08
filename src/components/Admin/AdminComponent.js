import React from "react";
import { Link } from "react-router-dom";


class AdminComponent extends React.Component {



    render() {
        return (
            <Link to={"createNewUser"}>Create user</Link>
        )
    }
}

export default AdminComponent