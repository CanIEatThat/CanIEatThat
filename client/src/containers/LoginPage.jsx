import React, { PropTypes } from 'react';
import Auth from '../modules/moduleAuth';
import LoginForm from '../components/LoginForm.jsx';


class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const welcomeMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    {/* prevent default action. in this case, action is the form submission event*/}
    event.preventDefault();

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;
  

  {/* create an AJAX request*/}
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('post', '/auth/login');
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlHttp.responseType = 'json';
    xmlHttp.addEventListener('load', () => {
      if (xmlHttp.status === 200) {
       

        {/* change the component-container state*/}
        this.setState({
          errors: {}
        });

        //saving token
        Auth.authenticateUser(xmlHttp.response.token);

        //changes current URL to "/"
        this.context.router.replace('/');
      } else {
        

        {/* change the component state*/}
        const errors = xmlHttp.response.errors ? xmlHttp.response.errors: {};
        errors.summary = xmlHttp.response.message;

        this.setState({
          errors
        });
      }
    });
    xmlHttp.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;