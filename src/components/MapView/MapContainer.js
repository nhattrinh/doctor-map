import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';
import { connect } from 'react-redux';

import Geocode from 'react-geocode';

import { MAPS_API_KEY } from '../../config';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            activeMarker: {},
            infoWindowShowing: false,
            activePlace: {}
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.doctors !== prevState.doctors) {
            var doctors = nextProps.doctors;
            doctors.map((v,i) => {
                Geocode.fromAddress(v.Recipient_Primary_Business_Street_Address_Line1 + ', ' + v.Recipient_City + ', ' + v.Recipient_State + ', ' + v.Recipient_Zip_Code)
                    .then(res => {
                        const { lat, lng } = res.results[0].geometry.location;
                        doctors[i].lat = lat;
                        doctors[i].lng = lng;
                    },
                    err => {
                        console.log(err);
                    });
            });

            return ({
                ...prevState,
                doctors
            });
        }
        return null;
    }

    onMarkerClick(activePlace, activeMarker) {
        this.setState({
            infoWindowShowing: true,
            activeMarker,
            activePlace
        })
    }

    onMapClick() {
        if (this.state.infoWindowShowing) { 
            this.setState({
                infoWindowShowing: false,
                activeMarker: null,
                activePlace: null
            });
        }
    }

    render() {
        return(
            <Map 
                google={this.props.google} 
                zoom={5}
                onClick={this.onMapClick.bind(this)}
                initialCenter={{
                    lat: 40.1164,
                    lng: -88.2434
                }}
            >
                { 
                    this.state.doctors.map((v,i) => {
                        return(
                            <Marker 
                                onClick={this.onMarkerClick.bind(this)}
                                key={v.Physician_Profile_ID}
                                name={`${v.Physician_First_Name} ${v.Physician_Last_Name}'s Office`} 
                                specialty={v.Physician_Specialty}
                                type={v.Physician_Primary_Type}
                                lat={v.lat}
                                lng={v.lng}
                                visible
                            />
                    )})
                }

                <InfoWindow 
                    onClose={this.onInfoWindowClose}
                    marker={this.state.activeMarker}
                    visible={this.state.infoWindowShowing}
                >
                    <div>
                        <h5>{this.state.activeMarker.name}</h5>
                        <hr />
                        Physician's Specialty: {this.state.activeMarker.specialty}
                        <br />
                        Physician's Type: {this.state.activeMarker.type}
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

const mapStateToProps = state => {
    return {
        doctors: state.search.doctors
    };
}

export default GoogleApiWrapper({
    apiKey: MAPS_API_KEY
})(connect(mapStateToProps)(MapContainer))