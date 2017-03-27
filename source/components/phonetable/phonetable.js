import React, {Component, PropTypes} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import './phonetable.scss';
import {connect} from 'react-redux';
import {itemsFetchAllv2, itemDelete, modalIsLoading, itemSet, itemCurrentSet} from '../../actions/actions';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import {red500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import PlusIcon from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Link from 'react-router/lib/Link';
import _isEmpty from 'lodash/isEmpty';
import InputDialog from '../inputdialog/inputdialog';
import {initialize} from 'redux-form';

const styles = {
    textCenterUppercase: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: ' #000'
    },
    textLeftUppercase: {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: ' #000',
    },
    textLeftUppercaseFixed: {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: ' #000',
        width: '260px'
    },
    textLeftUppercaseFixedLast: {
        textAlign: 'left',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: ' #000',
        width: '330px'
    },
    refresh: {
        position: 'relative'
    },
    textCenter: {
        textAlign: 'center'
    },
    textLeft: {
        textAlign: 'left'
    },
    widthTable: {
        width: 'inherit'
    },
    widthFixed: {
        width: '260px',
        textAlign: 'left'
    },
    widthFixedLast: {
        width: '330px',
        textAlign: 'left'
    }
};

class PhoneTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titleModal: ''
        };
    }

    componentDidMount() {
        if (_isEmpty(this.props.items))
            this.props.itemsFetchAllv2();
    }

    EditItem(sha1) {
        this.setState({titleModal: 'Edit Record'});
        this.props.itemSet(sha1);
        this.props.modalIsLoading(true);
    }

    newRecord() {
        this.setState({titleModal: 'New Record'});
        this.props.itemCurrentSet({});
        this.props.modalIsLoading(true);
    }

    render() {
        if (this.props.hasErrored) {
            return (<div>
                <ErrorIcon color={red500}/>
                <p>Sorry! There was an error loading the items</p>
            </div>);
        }

        if (this.props.isLoading) {
            return <RefreshIndicator size={50} left={575} top={20} status="loading" style={styles.refresh}/>;
        }
        return (
            <div>
                <InputDialog title={this.state.titleModal}/>
                <div className="leftText">
                    <FlatButton label="Add new record" primary={true} icon={<PlusIcon />}
                                onTouchTap={() => this.newRecord()}/>
                </div>
                <Table style={styles.widthTable}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={styles.textLeftUppercase}>Photo</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textLeftUppercaseFixed}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textLeftUppercaseFixed}>Phone</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textLeftUppercaseFixed}>Cell</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textLeftUppercaseFixedLast}>Email</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {this.props.items.map((item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={styles.textLeft}> <Avatar
                                    src={item.pictureThumb}/></TableRowColumn>
                                <TableRowColumn
                                    style={styles.widthFixed}>
                                    <Link to={"/user/" + item.sha1} className="underline">{item.fullName}</Link>
                                </TableRowColumn>
                                <TableRowColumn style={styles.widthFixed}>{item.phone}</TableRowColumn>
                                <TableRowColumn style={styles.widthFixed}>{item.cell}</TableRowColumn>
                                <TableRowColumn style={styles.widthFixedLast}>
                                    <div className="cellTableLast"><a
                                        href={"mailto:" + item.email} className="underline">{item.email}</a></div>
                                    <div className="cellMenu">
                                        <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                                  targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                                            <MenuItem primaryText="Edit" rightIcon={<Edit />}
                                                      onTouchTap={() => this.EditItem(item.sha1)}/>
                                            <MenuItem primaryText="Delete" rightIcon={<Delete />}
                                                      onTouchTap={() => this.props.itemDelete(item.sha1)}/>
                                        </IconMenu>
                                    </div>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

PhoneTable.propTypes = {
    itemsFetchAllv2: PropTypes.func.isRequired,
    itemDelete: PropTypes.func.isRequired,
    modalIsLoading: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.statusApp.hasErrored,
        isLoading: state.statusApp.isLoading,
        isModalShow: state.statusApp.isModalShow
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        itemsFetchAllv2: () => dispatch(itemsFetchAllv2()),
        itemDelete: (hash) => dispatch(itemDelete(hash)),
        modalIsLoading: (bool) => dispatch(modalIsLoading(bool)),
        itemSet: (hash) => dispatch(itemSet(hash)),
        itemCurrentSet: (item) => dispatch(itemCurrentSet(item))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneTable);