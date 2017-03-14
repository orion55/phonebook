import React from 'react';
import {Link} from 'react-router';
import history from '../../history';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const style = {
    margin: 12
};

const MainMenu = () => {
    return (
        <div className="main-menu">
            < RaisedButton label="Home" primary={true} style={style} href="#/"/>
            <RaisedButton label="Secondary" secondary={true} style={style} href="#/second"/>
            <FlatButton label="Third Link" secondary={true} onTouchTap={(event) => history.push('/third')}/>
        </div >
    )
};

export default MainMenu;
