import React from 'react';
import Auth from '../modules/moduleAuth';
import SearchBar from '../components/Dahboard.jsx';

class SearchPage extends React.Component {
        constructor(props) {
            super(props);

            this.state = {

                secretData: ''
            };
        }

// this isn't finished
        componentDidMount() {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open('get', '/api/dashboard');
            xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xmlHttp.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xmlHttp.responseType = 'json';
            xmlHttp.addEventListener('load, () => {
                if (xml.status === 200) {
                    this.setState({
                        secretData: xmlHttp.response.message
                    });
                }
            });
            xmlHttp.send();
        }
        //render the search page
        render() {
            return (<)
        }
            }
            ')
        }