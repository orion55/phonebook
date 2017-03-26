import './inputdialog.scss';
import React, {Component, PropTypes}  from 'react';
import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {modalIsLoading} from '../../actions/actions';
import Avatar from 'material-ui/Avatar';
import {reduxForm, Field} from 'redux-form';
import {TextField, DatePicker} from 'redux-form-material-ui';
import './inputdialog.scss';

class InputDialog extends Component {
    constructor(props) {
        super(props);
    };

    handleSubmit() {
        this.props.modalIsLoading(false);
        console.log('Ok');
    };

    render() {
        const actions = [
            <FlatButton label="Cancel" onTouchTap={(event) => this.props.modalIsLoading(false)}/>,
            <FlatButton label="Ok" primary={true} onTouchTap={(event) => this.handleSubmit()}/>
        ];
        return (
            <Dialog actions={actions} modal={false} open={this.props.isModalShow} title={this.props.title}>
                {/*<Avatar src={this.props.currentItem.pictureLarge} size={150}/>*/}
                <form name="InputDialog">
                    <div className="dialog__wrap">
                        <Field name="fullName" component={TextField} floatingLabelText="Name"
                               className="dialog__widthFull"/>
                        <Field name="phone" component={TextField} floatingLabelText="Phone"
                               className="dialog__widthHalf"/>
                        <Field name="cell" component={TextField} floatingLabelText="Cell"
                               className="dialog__widthHalf"/>
                        <Field name="email" component={TextField} floatingLabelText="Email"
                               className="dialog__widthHalf"/>
                    </div>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isModalShow: state.statusApp.isModalShow,
        initialValues:  state.currentItem
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modalIsLoading: (bool) => dispatch(modalIsLoading(bool))
    };
};

InputDialog = reduxForm({
    form: 'InputDialog',
    enableReinitialize: true
})(InputDialog);


export default connect(mapStateToProps, mapDispatchToProps)(InputDialog);