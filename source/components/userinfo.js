import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {itemSet} from '../actions/actions';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import {red500} from 'material-ui/styles/colors';

class UserInfo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.itemSet(this.props.id);
    }

    render() {
        if (Object.getOwnPropertyNames(this.props.currentItem).length === 0) {
            return (<div className="centerText">
                <ErrorIcon color={red500}/>
                <p>Sorry! There was an error loading the item!</p>
            </div>);
        }
        return (
            <div>
                <h2>{this.props.id}</h2>
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