import './inputdialog.scss';
import React, {Component, PropTypes}  from 'react';
import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {modalIsLoading} from '../../actions/actions';
import Avatar from 'material-ui/Avatar';

class InputDialog extends Component {
    render() {
        const actions = [
            <FlatButton label="Cancel" onTouchTap={(event) => this.props.modalIsLoading(false)}/>,
            <FlatButton label="Ok" primary={true}/>
        ];
        return (
            <Dialog actions={actions} modal={false} open={this.props.isModalShow} title={this.props.title}>
                <Avatar src={this.props.currentItem.pictureLarge} size={150}/>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentItem: state.currentItem,
        isModalShow: state.statusApp.isModalShow
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modalIsLoading: (bool) => dispatch(modalIsLoading(bool))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(InputDialog);