import React from 'react';
import UserInfo from '../components/userinfo/userinfo';

const SecondView = (props) => {
    return (
        <div>
            <UserInfo id={props.params.id}/>
        </div>
    );
};

export default SecondView;
