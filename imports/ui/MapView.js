import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import GoogleMapReact from 'google-map-react';

import {getLocation} from './Utils';


const K_SIZE = 40;

const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    top: -K_SIZE / 2,

    border: '5px solid #f44336',
    borderRadius: K_SIZE,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4,
    cursor: 'pointer'
};

class MapView extends Component {

    state = {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
        markers: []
    };

    componentDidMount() {
        getLocation().then(
            (p) => this.setState({latitude: p.latitude, longitude: p.longitude})
        );
        Promise.resolve(
            [
                {
                    coordinate: [52.2878885, 21.0099406],
                    text: 'F'
                },
                {
                    coordinate: [52.2888885, 21.0099406],
                    text: 'A'
                },
                {
                    coordinate: [52.2898885, 21.0109406],
                    text: 'G'
                },
                {
                    coordinate: [52.2858885, 21.0059406],
                    text: 'E'
                },
                {
                    coordinate: [52.2838885, 21.0079406],
                    text: 'T'
                }

            ]
        ).then(
            (coords) => {
                this.setState({markers: coords});
            }
        );
    }

    render() {
        return <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAv3WO4KdShpB-adbwKcagGAqgl-PeK4Vc' }}
                center={{lat: this.state.latitude, lng: this.state.longitude}}
                zoom={this.state.zoom}
            >
                {
                    this.state.markers.map(
                        (coord, id) =>
                            <div key={id} style={greatPlaceStyle} lat={coord.coordinate[1]} lng={coord.coordinate[1]}>
                                <div>{coord.text}</div>
                            </div>
                    )
                }
            </GoogleMapReact>
        </div>;
    }
}

export default withRouter(MapView);
