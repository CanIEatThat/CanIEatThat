import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        /*set initial component state*/
        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }
    /*changes the user object*/
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    processForm(event) {
        event.preventDefault();

        console.log('name:', this.state.user.name);
        console.log('email:', this.state.user.email);
        console.log('password:', this.state.user.password);
    }

    render() {
        return (
            <SignUpForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={this.state.errors}
            user={this.state.user}
            />
        );
    }
}

export default SignUpPage;