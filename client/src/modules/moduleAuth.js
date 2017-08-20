class Auth {
    //authenticate user and save token in local storage
    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }
    //check if user is authenticated and token is saved in local storage
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }
    //deactivate user and remove token from local storage
    static deauthenticateUser() {
        localStorage.removeItem('token');
    }
    //get a token
    static getToken() {
        return localStorage.getItem('token');
    }
}

export default Auth;