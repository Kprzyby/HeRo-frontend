import React from "react";
import { Link } from "react-router-dom";


class AdminComponent extends React.Component {



    render() {
        return (
            <div>
                <Link to={"createNewUser"}>Create user</Link>
                <br></br>
                <Link to={"addSmtpAccount"}>Add smtp acc</Link>
                <br></br>
                <Link to={"addImapAccount"}>Add imap acc</Link>
                <br></br>
                <Link to={"showAllMails"}>Show all mails</Link>
            </div>

        )
    }
}

export default AdminComponent