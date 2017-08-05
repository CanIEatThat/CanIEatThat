import React from 'react';
{/*might have to change this as we add more things*/}
import {Card, CardTitle } from 'material-ui/Card';

const HomePage = () => (
    <Card className='container'>
        <CardTitle title='Can i eat This?' subtitle='Your Gout Diet Helper.' />
        {/*search component goes here*/}
    </Card>
);

export default HomePage;