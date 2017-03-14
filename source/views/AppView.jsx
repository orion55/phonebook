import React, {Component} from 'react';

import Container from '../components/Container/Container';
import MainMenu from '../containers/MainMenu/MainMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

const AppView = (props) => {
    return (
        <MuiThemeProvider>
            <Container>
                <MainMenu/>
                {props.children}
            </Container>
        </MuiThemeProvider>
    );
};

export default AppView;
