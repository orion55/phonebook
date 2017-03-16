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
import {itemsFetchData} from '../actions/actions';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const styles = {
    textCenterUppercase: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: ' #000'
    },
    refresh: {
        // display: 'inline-block',
        position: 'relative',
    },
};

class PhoneTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <RefreshIndicator size={50} left={575} top={20} status="loading" style={styles.refresh}/>;
        }
        return (
            <div>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={styles.textCenterUppercase}>Photo</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textCenterUppercase}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textCenterUppercase}>Phone</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textCenterUppercase}>Cell</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textCenterUppercase}>Email</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    {/*
                     <TableBody displayRowCheckbox={false} showRowHover={true}>

                     </TableBody>
                     */}
                </Table>
            </div>
        );
    }
}

PhoneTable.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneTable);