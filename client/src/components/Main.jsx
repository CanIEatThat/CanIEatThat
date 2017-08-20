import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

const Main = ({ children }) => (
    <div>
        <div className='top-bar'>
            <div className='top-bar-left'>
                <IndexLink to='/'>Can I Eat That?</IndexLink>
            </div>

            {Auth.isUserAuthenticated() ? (
                <div className='top-bar-right'>
                    <Link to='/logout'>Log Out</Link>
                </div>
            ) : (
                <div className='top-bar-right'>
                    <Link to='/login'>Log in</Link>
                    <Link to='/signup'>Sign up</Link>
                </div>
            )}
            

        </div>
        {/*children passed as a prop by router*/}
        {children}

    </div>
);

Main.propTypes = {
    children: PropTypes.object.isRequired
};

export default Main;