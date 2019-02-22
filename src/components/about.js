import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class About extends Component {
    render() {
        return (
            <div>
                <h1>Hello About {this.props.userName}     {this.props.lastName}</h1>
                <Link to='/'>Go to Home</Link>
            </div>
        )
    }
}

function mapStateToProp(state){
    return({
        userName: state.rootReducer.userName,
        lastName: state.rootReducer.lastName 
    })
}
function mapDispatchToProp(dispatch){
    return({
    })
}

export default connect(mapStateToProp,mapDispatchToProp)(About);


