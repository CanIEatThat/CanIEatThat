import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUpPage extends React.Component {

    constructor(props, context) {
        super(props, context);
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
        {/*create a string for an HTTP body message*/}
       const name = encodeURIComponent(this.state.user)
       const email = encodeURIComponent(this.state.user)
       const password = encodeURIComponent(this.state.user)
       const formData = `name=${name}&email=${email}&password=${password}`;

       //create an AJAX request
       const xmlHttp = new XMLHttpRequest();
       xmlHttp.open('post', '/auth/signup');
       xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
       xmlHttp.responseType = 'json';
       xmlHttp.addEventListener('load', () => {
           if (xmlHttp.status === 200) {
               {/*change the component-container state*/}
               this.setState({
                   errors: {}
               });

               console.log('The form is valid');
           } else{

            const errors = xmlHttp.response.errors ? xmlHttp.response.errors : {};
            errors.summary = xmlHttp.response.message;

            this.setState({
                errors
            });
       }
           
    });
    xmlHttp.send(formData);
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

SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpPage;