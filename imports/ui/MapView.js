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

    componentWillUnmount() {
        this.state.markers && this.state.markers.forEach((m) => m.setMap(null))
    }

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
        ).then(
            () => this.initMap()
        );

        Promise.all(
            benefitToRequest[benefitList.indexOf(this.props.match.params.search)].map(
                (searchBenefit) => axios.get(
                    `https://api.nfz.gov.pl/queues?page=1&limit=25&format=json&case=1&province=07&locality=Warszawa&benefit=${searchBenefit}`
                )
            )
        ).then(
            (results) => this.addMarkers(results)
        );
    }

    addMarkers(results) {
        if (window.google && window.google.maps && window.google.maps.Map && this.state.map) {
            const fu = results.flatMap(
                (r) => r.data.data.map(
                    (inst) => {
                        const infowindow = new google.maps.InfoWindow({
                            content: `<div id="content">
    <h1 id="firstHeading" class="firstHeading">${inst.attributes.benefit}</h1>
    <div id="bodyContent">
        <p><b>${inst.attributes.address}</b></p>
        <i class="ui phone icon"}></i> ${inst.attributes.phone}
    </div>
</div>`
                        });

                        const marker = new window.google.maps.Marker({
                            position: {
                                lat: inst.attributes.latitude,
                                lng: inst.attributes.longitude
                            }, map: this.state.map,
                            title: inst.attributes.place
                        });

                        marker.addListener('click', function() {
                            infowindow.open(map, marker);
                        });

                        return marker;
                        // return ({text: `${inst.attributes.benefit}  (${inst.attributes.address} = ${inst.attributes.phone})`, coordinate: [inst.attributes.latitude, inst.attributes.longitude]})
                    }
                )
            );
            this.setState({markers: fu});
        } else {
            setTimeout(this.addMarkers.bind(this, results), 500);
        }
    }

    initMap() {
        if (window.google && window.google.maps && window.google.maps.Map) {
            const map = new window.google.maps.Map(
                document.getElementById('map'), {
                    center: {lat: this.state.latitude, lng: this.state.longitude},
                    zoom: 11
                });

            google.maps.event.addDomListener(window, "resize", function() {
                const center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });

            this.setState({map}, this.forceUpdate);
        } else {
            setTimeout(this.initMap.bind(this), 500);
        }
    }

    render() {
        return <div style={{height: '95vh' , width: '100%' }} id='map' />;
    }

    // render() {
    //     return <div style={{ height: '100vh', width: '100%' }}>
    //         {/*<GoogleMapReact*/}
    //             {/*bootstrapURLKeys={{ key: 'AIzaSyCo8HcPurLzb8JoBz3da3ufAcurDdE-Koc' }}*/}
    //             {/*center={{lat: this.state.latitude, lng: this.state.longitude}}*/}
    //             {/*zoom={this.state.zoom}*/}
    //         {/*>*/}
    //             {/*{*/}
    //                 {/*this.state.markers.map(*/}
    //                     {/*(coord, id) =>*/}
    //                         {/*<div key={id} style={greatPlaceStyle} lat={coord.coordinate[0]} lng={coord.coordinate[1]}>*/}
    //                             {/*<div>{coord.text}</div>*/}
    //                         {/*</div>*/}
    //                 {/*)*/}
    //             {/*}*/}
    //         {/*</GoogleMapReact>*/}
    //     </div>;
    // }
}

export default withRouter(withCookies(MapView));
