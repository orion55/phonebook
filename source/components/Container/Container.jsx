import React from 'react';
import {Toolbar} from 'material-ui/Toolbar';

const Container = (props) => {
    return (
        <Toolbar>
            <div className='container'>
                {props.children}
            </div>
        </Toolbar>
    );
};

export default Container;
