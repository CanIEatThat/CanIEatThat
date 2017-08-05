import Main from './components/Main.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';

const routes = {
    components: Main,
    childRoutes: [

        {
            path: '/',
            component: HomePage
        },
        {
           path: '/login',
           component: LoginPage 
        },
        {
            path: '/signup',
            component: SignUpPage
        }
    ]
};

export default routes;