import './inputdialog.scss';
import React, {Component, PropTypes}  from 'react';
import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {modalIsLoading, itemUpdate, itemInsert, itemSet, dataFetchV2} from '../../actions/actions';
import {reduxForm, Field} from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import './inputdialog.scss';
import Autorenew from 'material-ui/svg-icons/action/autorenew';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import axios from 'axios';

const validate = values => {
    const errors = {};
    const requiredFields = ['fullName', 'phone', 'cell', 'email'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
};

class InputDialog extends Component {
    constructor(props) {
        super(props);
    };

    handleSubmit() {
        if (this.props.valid) {
            if (this.props.title === 'Edit Record') {
                this.props.itemUpdate(this.props.formInput.values);
                this.props.itemSet(this.props.formInput.values.sha1);
            } else {
                if (this.props.formInput.values.hasOwnProperty('sha1')) {
                    this.props.itemInsert(this.props.formInput.values);
                } else {
                    axios.get('https://randomuser.me/api/?nat=us')
                        .then((response) => {
                            let {
                                login: {sha1: sha1},
                                picture:{large: pictureLarge, thumbnail: pictureThumb}
                            } = response.data.results[0];

                            let item = {sha1, pictureThumb, pictureLarge};
                            Object.assign(item, this.props.formInput.values);
                            this.props.itemInsert(item);
                        })
                        .catch(() => console.log('Error in load data!'));
                }
            }
            this.props.modalIsLoading(false);
        }
    };

    handleGenerate() {
        this.props.dataFetchV2();
    };

    render() {
        let actions = [];
        if (this.props.title === 'New Record') {
            let Icon = '';
            if (this.props.hasDataErrored) {
                Icon = <ErrorIcon/>;
            } else if (this.props.isDataLoading) {
                Icon = <Autorenew />;
            }

            actions.push(<FlatButton label="Generate" labelPosition="before" secondary={true}
                                     onTouchTap={(event) => this.handleGenerate()}
                                     icon={Icon}/>);
        }
        actions.push(<FlatButton label="Cancel" onTouchTap={(event) => this.props.modalIsLoading(false)}/>);
        actions.push(<FlatButton label="Ok" primary={true} onTouchTap={(event) => this.handleSubmit()}/>);

        return (
            <Dialog actions={actions} modal={false} open={this.props.isModalShow} title={this.props.title}>
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

InputDialog.propTypes = {
    modalIsLoading: PropTypes.func.isRequired,
    itemUpdate: PropTypes.func.isRequired,
    itemInsert: PropTypes.func.isRequired,
    itemSet: PropTypes.func.isRequired,
    dataFetchV2: PropTypes.func.isRequired,
    isModalShow: PropTypes.bool.isRequired,
    initialValues: PropTypes.object.isRequired,
    isDataLoading: PropTypes.bool.isRequired,
    hasDataErrored: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        isModalShow: state.statusApp.isModalShow,
        initialValues: state.currentItem,
        formInput: state.form.InputDialog,
        isDataLoading: state.statusApp.isDataLoading,
        hasDataErrored: state.statusApp.hasDataErrored
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modalIsLoading: (bool) => dispatch(modalIsLoading(bool)),
        itemUpdate: (item) => dispatch(itemUpdate(item)),
        itemInsert: (item) => dispatch(itemInsert(item)),
        itemSet: (hash) => dispatch(itemSet(hash)),
        dataFetchV2: () => dispatch(dataFetchV2())
    };
};

InputDialog = reduxForm({
    form: 'InputDialog',
    enableReinitialize: true,
    validate
})(InputDialog);


export default connect(mapStateToProps, mapDispatchToProps)(InputDialog);