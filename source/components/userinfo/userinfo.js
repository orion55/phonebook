import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {itemSet, modalIsLoading} from '../../actions/actions';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import {red500} from 'material-ui/styles/colors';
import _isEmpty from 'lodash/isEmpty';
import FlatButton from 'material-ui/FlatButton';
import history from '../../router/router';
import ReturnIcon from 'material-ui/svg-icons/hardware/keyboard-return';
import Avatar from 'material-ui/Avatar';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import './userinfo.scss';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import {itemDelete} from '../../actions/actions';
import InputDialog from '../inputdialog/inputdialog';

const styles = {
    avatarBottom: {
        marginBottom: "20px"
    },
    widthTable: {
        width: '600px'
    },
};

class UserInfo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.itemSet(this.props.id);
    }

    DeleteTouch(sha1) {
        this.props.itemDelete(sha1);
        history.push('/');
    }

    EditItem(sha1) {
        this.props.itemSet(sha1);
        this.props.modalIsLoading(true);
    }

    render() {
        if (_isEmpty(this.props.currentItem)) {
            return (<div className="centerText">
                <ErrorIcon color={red500}/>
                <p>Sorry! There was an error loading the item!</p>
            </div>);
        }
        return (
            <div>
                <InputDialog title="Edit Record"/>
                <div className="User-Menu">
                    <FlatButton label="Back to the list" primary={true}
                                onTouchTap={() => history.push('/')} icon={<ReturnIcon />}/>
                    <div className="User-Editor">
                        <IconButton tooltip="Edit" tooltipPosition="bottom-center"
                                    onTouchTap={() => this.EditItem(this.props.currentItem.sha1)}>
                            <Edit color={'#00BCD4'}/>
                        </IconButton>
                        <IconButton tooltip="Delete" tooltipPosition="bottom-center"
                                    onTouchTap={() => this.DeleteTouch(this.props.currentItem.sha1)}>
                            <Delete color={'#00BCD4'}/>
                        </IconButton>
                    </div>
                </div>
                <div className="wrap">
                    <Avatar src={this.props.currentItem.pictureLarge} size={150} style={styles.avatarBottom}/>
                    <div className="User-FullName">{this.props.currentItem.fullName}</div>
                    <Table style={styles.widthTable}>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            <TableRow>
                                <TableRowColumn><span className="User-FontDec">Phone</span></TableRowColumn>
                                <TableRowColumn>{this.props.currentItem.phone}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn><span className="User-FontDec">Cell</span></TableRowColumn>
                                <TableRowColumn>{this.props.currentItem.cell}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn><span className="User-FontDec">Email</span></TableRowColumn>
                                <TableRowColumn>{this.props.currentItem.email}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}

UserInfo.propTypes = {
    itemDelete: PropTypes.func.isRequired,
    itemSet: PropTypes.func.isRequired,
    modalIsLoading: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        currentItem: state.currentItem
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        itemSet: (hash) => dispatch(itemSet(hash)),
        itemDelete: (hash) => dispatch(itemDelete(hash)),
        modalIsLoading: (bool) => dispatch(modalIsLoading(bool)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);