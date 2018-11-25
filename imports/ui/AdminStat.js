import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import axios from 'axios';

import {getLocation} from './Utils';
import {benefitList, benefitToRequest} from './SearchTextMap';


class AdminStat extends Component {

    state = {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 12,
        markers: []
    };

    changeHeatmap(event) {
        Meteor.call('stats.sortByDiseaseType', event.value).then(
            () => Meteor.call('stats.generateMap')
        ).then(
            (heatmapData) => {
                var poland = new google.maps.LatLng(52.2251731, 20.9610747);

                map = new google.maps.Map(document.getElementById('map'), {
                    center: poland,
                    zoom: 6,
                });

                var heatmap = new google.maps.visualization.HeatmapLayer({
                    data: heatmapData
                });
                heatmap.setMap(map);
            }
        );

        // var heatmapData = [
        //     {location: new google.maps.LatLng(53.782, 22.447), weight: 9999},
        //     {location: new google.maps.LatLng(51.782, 20.447), weight: 4500},
        //     new google.maps.LatLng(37.782, -122.443),
        //     new google.maps.LatLng(37.782, -122.441),
        //     new google.maps.LatLng(37.782, -122.439),
        //     new google.maps.LatLng(37.782, -122.437),
        //     new google.maps.LatLng(37.782, -122.435),
        //     new google.maps.LatLng(37.785, -122.447),
        //     new google.maps.LatLng(37.785, -122.445),
        //     new google.maps.LatLng(37.785, -122.443),
        //     new google.maps.LatLng(37.785, -122.441),
        //     new google.maps.LatLng(37.785, -122.439),
        //     new google.maps.LatLng(37.785, -122.437),
        //     new google.maps.LatLng(37.785, -122.435)
        // ];
    }

    render() {
        return <React.Fragment>
            <select onChange={this.changeHeatmap.bind(this)} style={{position: 'fixed', top:20, zIndex: 9999999999999999999, left: 230, height:40}}>
                <option value="">All Diseases</option>
                <option value="ODDZIAŁ KARDIOCHIRURGICZNY">ODDZIAŁ KARDIOCHIRURGICZNY</option>
                <option value="ODDZIAŁ NEUROLOGICZNY">ODDZIAŁ NEUROLOGICZNY</option>
                <option value="DZIAŁ (PRACOWNIA) FIZJOTERAPII">DZIAŁ (PRACOWNIA) FIZJOTERAPII</option>
                <option value="OPIEKA DOMOWA  RODZINNA">OPIEKA DOMOWA  RODZINNA</option>
                <option value="ODDZIAŁ REHABILITACJI PULMONOLOGICZNEJ">ODDZIAŁ REHABILITACJI PULMONOLOGICZNEJ</option>
                <option value="ŚWIADCZENIA Z ZAKRESU KARDIOLOGII">ŚWIADCZENIA Z ZAKRESU KARDIOLOGII</option>
                <option value="PORADNIA GASTROENTEROLOGICZNA">PORADNIA GASTROENTEROLOGICZNA</option>
                <option value="ODDZIAŁ OKULISTYCZNY">ODDZIAŁ OKULISTYCZNY</option>
                <option value="ODDZIAŁ CHIRURGII URAZOWO-ORTOPEDYCZNEJ">ODDZIAŁ CHIRURGII URAZOWO-ORTOPEDYCZNEJ</option>
                <option value="ODDZIAŁ ALERGOLOGICZNY">ODDZIAŁ ALERGOLOGICZNY</option>
                <option value="ODDZIAŁ GASTROENTEROLOGICZNY">ODDZIAŁ GASTROENTEROLOGICZNY</option>
                <option value="ODDZIAŁ HEMATOLOGICZNY">ODDZIAŁ HEMATOLOGICZNY</option>
            </select>
            <div style={{height: '95vh' , width: '100%' }} id='map' />
        </React.Fragment>;
    }
}

export default withRouter(withCookies(AdminStat));
