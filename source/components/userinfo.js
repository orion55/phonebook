import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {itemSet} from '../actions/actions';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import {red500} from 'material-ui/styles/colors';
import _isEmpty from 'lodash/isEmpty';
import FlatButton from 'material-ui/FlatButton';
import history from '../router/router';
import ReturnIcon from 'material-ui/svg-icons/hardware/keyboard-return';
import Avatar from 'material-ui/Avatar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const styles = {
    avatarBottom: {
        marginBottom: "20px"
    }
};

function handleTouchTap() {
    history.push('/');
}

class UserInfo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.itemSet(this.props.id);
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
                <FlatButton label="Back to the list" primary={true}
                            onTouchTap={handleTouchTap} icon={<ReturnIcon />}/>
                <div className="wrap">
                    <Avatar src={this.props.currentItem.pictureLarge} size={150} style={styles.avatarBottom}/>
                    <div className="fullName">{this.props.currentItem.fullName}</div>
                    <Table>
                        <TableBody displayRowCheckbox={false} showRowHover={true}>
                            <TableRow>
                                <TableRowColumn>Phone</TableRowColumn>
                                <TableRowColumn>{this.props.currentItem.phone}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Cell</TableRowColumn>
                                <TableRowColumn>{this.props.currentItem.cell}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Email</TableRowColumn>
                                <TableRowColumn>{this.props.currentItem.email}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Birthday</TableRowColumn>
                                <TableRowColumn>{this.props.currentItem.dob}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentItem: state.currentItem
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        itemSet: (hash) => dispatch(itemSet(hash))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);