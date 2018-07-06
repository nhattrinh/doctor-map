import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';
import { connect } from 'react-redux';

import { MAPS_API_KEY } from '../../config';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            activeMarker: {},
            infoWindowShowing: false,
            activePlace: {},
            error: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.doctors !== prevState.doctors) {
            return ({
                ...prevState,
                doctors: nextProps.doctors,
                error: nextProps.error
            });
        }
        return prevState;
    }

    onMarkerClick(activePlace, activeMarker) {
        this.setState({
            infoWindowShowing: true,
            activeMarker,
            activePlace
        })
    }

    onMapClick() {
        this.setState({
            infoWindowShowing: false,
            activeMarker: null,
            activePlace: null
        });
    }

    render() {
        if (this.state.error)
            alert(this.state.error);
        return(
            <Map 
                google={this.props.google} 
                zoom={4}
                onClick={this.onMapClick.bind(this)}
                initialCenter={{
                    lat: 40.1164,
                    lng: -88.2434
                }}
            >
                { 
                    this.state.doctors.map(v => {
                        return(
                            <Marker 
                                onClick={this.onMarkerClick.bind(this)}
                                key={v.Physician_Profile_ID}
                                name={`${v.Physician_First_Name} ${v.Physician_Last_Name}`} 
                                specialty={v.Physician_Specialty}
                                type={v.Physician_Primary_Type}
                                position={{ 
                                    lat: v.lat,
                                    lng: v.lng
                                }}
                                visible
                            />
                    )})
                }

                <InfoWindow 
                    onClose={this.onInfoWindowClose}
                    marker={this.state.activeMarker}
                    visible={this.state.infoWindowShowing}
                >
                    { this.state.activeMarker ? 
                    <div>
                        <h5>{this.state.activeMarker.name}</h5>
                        <hr />
                        <b>Physician's Specialty:</b> {this.state.activeMarker.specialty}
                        <br />
                        <b>Physician's Type:</b> {this.state.activeMarker.type}
                    </div> : <div></div>
                    }
                </InfoWindow>
            </Map>
        )
    }
}

const mapStateToProps = state => {
    return {
        doctors: state.search.doctors,
        error: state.search.error
    };
}

export default GoogleApiWrapper({
    apiKey: MAPS_API_KEY
})(connect(mapStateToProps)(MapContainer))