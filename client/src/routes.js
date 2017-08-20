import Main from './components/Main.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx'
import SearchPage from './containers/Searchpage.jsx'
import ResultsPage from './containers/ResultsPage.jsx'
import Auth from 'modules/moduleAuth.js'

const routes = {
    components: Main,
    childRoutes: [

        {
            path: '/',
            getComponent: (location, callback) => {
                if(Auth.isUserAuthenticated()) {
                    callback(null, SearchPage);
                } else {
                    callback(null, HomePage);
                }
            }
        },
        {
           path: '/login',
           component: LoginPage 
        },
        {
            path: '/signup',
            component: SignUpPage
        },
        {
            path: '/results',
            component: ResultsPage
            //replace this with a getComponent to the results page onEnter
        },
        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();

                replace('/');
            }
        }
    ]
};

export default routes;