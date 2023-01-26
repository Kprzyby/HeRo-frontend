import React from "react";
import emailService from "../../services/email.service";
class ShowMailsComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mails: []
        }

    }
    componentDidMount() {
        emailService.getAllMails().then(res => {
            this.setState({
                mails: res
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.mails.length !== 0 ? this.state.mails : <h1>brak danych</h1>}
            </div>

        )
    }
}

export default ShowMailsComponent