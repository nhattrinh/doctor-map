import React, { Component } from 'react';
import { Map } from 'google-maps-react';

import actions from '../../redux/actions';

import { connect } from 'react-redux';

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        var ref = firebase.database().ref('doctors');
    }   

    render() {
        return(
            <Map>
                
            </Map>
        );
    }
}

const mapStateToProps = state => {
    return {
        firstName: state.search.firstName,
        middleName: state.search.middleName,
        lastName: state.search.lastName
    };
}

export default connect(mapStateToProps, actions)(MapView);


