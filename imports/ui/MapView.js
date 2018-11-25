import React, {Component} from 'react';
import {Grid, Container} from 'semantic-ui-react';

import GoogleMapReact from 'google-map-react';

import {getLocation} from './Utils';


export default class MapView extends Component {

    state = {
        viewport: {
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8,
        }
    };

    componentDidMount() {
        getLocation().then(
            (p) => this.setState({viewport: Object.assign(this.state.viewport, {latitude: p.latitude, longitude: p.longitude})})
        )
    }

    render() {
        return <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAv3WO4KdShpB-adbwKcagGAqgl-PeK4Vc' }}
                center={{lat: this.state.viewport.latitude, lng: this.state.viewport.longitude}}
                zoom={8}
            />
        </div>;
    }
}
