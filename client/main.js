import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import './main.html';
import 'semantic-ui-css/semantic.min.css';

import App from '../imports/ui/App';

Meteor.startup(() => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('render-target')
    );
});
