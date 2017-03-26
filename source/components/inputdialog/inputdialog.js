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
                        <Field name="fullName" component={TextField} hintText="Name" styles={"width: 100%"}/>
                        <Field name="phone" component={TextField} hintText="Phone"/>
                        <Field name="cell" component={TextField} hintText="Cell"/>
                        <Field name="email" component={TextField} hintText="Email"/>
                        <Field name="dob" component={DatePicker} format={null} hintText="Birthday"/>
                    </div>
                </form>
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

InputDialog = reduxForm({
    form: 'InputDialog'
})(InputDialog);

export default connect(mapStateToProps, mapDispatchToProps)(InputDialog);