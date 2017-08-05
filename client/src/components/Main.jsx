import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router'

const Main = ({ children }) => (
    <div>
        <div className='top-bar'>
            <div className='top-bar-left'>
                <IndexLink to='/'>Can I Eat This?</IndexLink>
            </div>

            <div className='top-bar-right'>
                <Link to='/login'>Log in</Link>
                <Link to='/signup'>Sign up</Link>
            </div>

        </div>
        {/*children passed as a prop by router*/}
        {children}

    </div>
);

Main.propTypes = {
    children: PropTypes.object.isRequired
};

export default Main;