import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';

import { MAPS_API_KEY } from '../../config';

export class MapContainer extends Component {
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

export default GoogleApiWrapper({
    apiKey: MAPS_API_KEY
})(MapContainer)