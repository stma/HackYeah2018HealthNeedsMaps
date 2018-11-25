import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import axios from 'axios';

import GoogleMapReact from 'google-map-react';

import {getLocation} from './Utils';
import {benefitList, benefitToRequest} from './SearchTextMap';


const K_SIZE = 35;

const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    top: -K_SIZE / 2,
    background: 'url("https://maps.google.com/mapfiles/kml/shapes/library_maps.png")',
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
        zoom: 12,
        markers: []
    };

    componentDidMount() {
        getLocation().then(
            (p) => {
                this.setState({latitude: p.latitude, longitude: p.longitude});
                return p;
            }
        ).then(
            (p) => Meteor.call(
                'search.do',
                benefitToRequest[benefitList.indexOf(this.props.match.params.search)][0],
                this.props.cookies.get('userId'),
                null,
                [p.latitude, p.longitude]
            )
    );

        Promise.all(
            benefitToRequest[benefitList.indexOf(this.props.match.params.search)].map(
                (searchBenefit) => axios.get(
                    `https://api.nfz.gov.pl/queues?page=1&limit=25&format=json&case=1&province=07&locality=Warszawa&benefit=${searchBenefit}`
                )
            )
        ).then(
            (results) => {
                const fu = results.flatMap(
                    (r) => r.data.data.map(
                        (inst) => {
                            return ({text: `${inst.attributes.benefit}  (${inst.attributes.address} = ${inst.attributes.phone})`, coordinate: [inst.attributes.latitude, inst.attributes.longitude]})
                        }
                    )
                );
                this.setState({markers: fu});
            }
        );
    }

    render() {
        return <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCo8HcPurLzb8JoBz3da3ufAcurDdE-Koc' }}
                center={{lat: this.state.latitude, lng: this.state.longitude}}
                zoom={this.state.zoom}
            >
                {
                    this.state.markers.map(
                        (coord, id) =>
                            <div key={id} style={greatPlaceStyle} lat={coord.coordinate[0]} lng={coord.coordinate[1]}>
                                <div>{coord.text}</div>
                            </div>
                    )
                }
            </GoogleMapReact>
        </div>;
    }
}

export default withRouter(withCookies(MapView));
