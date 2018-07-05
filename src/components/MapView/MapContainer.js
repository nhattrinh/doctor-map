import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';
import { connect } from 'react-redux';

import { MAPS_API_KEY } from '../../config';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null
        };
    }
    render() {
        return(
            <Map google={this.props.google} zoom={14}>
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>lol</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        snapshotKeys: state.search.snapshotKeys,
        snapshot: state.search.snapshot
    };
}

export default GoogleApiWrapper({
    apiKey: MAPS_API_KEY
})(connect(mapStateToProps)(MapContainer))