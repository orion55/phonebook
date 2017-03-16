import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import history from '../router/router';

injectTapEventPlugin();

function handleTouchTap() {
    history.push('/');
}

const styles = {
    title: {
        cursor: 'pointer'
    },
    app: {
        marginBottom: '20px'
    }
};


const AppView = (props) => {
    return (
        <MuiThemeProvider>
            <div className="container">
                <AppBar
                    title={<div style={styles.title}>Телефонный справочник</div>}
                    iconElementLeft={<IconButton><PhoneIcon /></IconButton>}
                    onTitleTouchTap={handleTouchTap}
                    onLeftIconButtonTouchTap={handleTouchTap}
                    style={styles.app}
                />
                {props.children}
            </div>
        </MuiThemeProvider>
    );
};

export default AppView;
