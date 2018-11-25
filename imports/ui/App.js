import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

import InitUser from './InitUser';
import SortBy from './SortBy';
import MapView from './MapView';
import Search from './Search';
import AdminStat from './AdminStat';

import 'semantic-ui-css';


export default class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <div style={{minHeight: '100%', borderTop: '5vh solid #E91D63'}}>
                    <Switch>
                        <Route exact path='/' component={InitUser} />
                        <Route path='/search' component={Search} />
                        <Route path='/sort/:search' component={SortBy} />
                        <Route path='/map/:search/:sort' component={MapView} />
                        <Route path='/admin' component={AdminStat} />
                    </Switch>
                </div>
            </CookiesProvider>
        );
    }
}
