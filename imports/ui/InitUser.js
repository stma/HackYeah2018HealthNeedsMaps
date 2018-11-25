import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import {Redirect} from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import uuid from 'uuid/v4';
import {Header, Container, Form, Button, Grid, Image, Dimmer} from 'semantic-ui-react';

import {getLocation} from './Utils';


class InitUser extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {nameOf: '', time: true};
    }

    nameChanged(event) {
        const nameOf = event.target.value;
        this.setState({nameOfInState: nameOf});
    }

    componentDidMount() {
        const {cookies} = this.props;

        if (!cookies.get('userId')) {
            cookies.set('userId', uuid());
        }

        getLocation();
        setTimeout(() => this.setState({time: false}), 2000);
    }

    render() {
        const { cookies } = this.props;
        const { nameOfInState, time } = this.state;

        const nameOf = cookies.get('name');

        if (nameOf)
            return <Redirect to='/search' />;

        return <div>
            {
                this.state.time
                && <Dimmer active={time} verticalAlign='top'>
                    <Header style={{color: 'white'}}>Health Needs Maps</Header>
                    <Image src='/doctor-2025725_960_720.png' />
                </Dimmer>
            }
            {
                !this.state.time
                && <Container fluid>
                    <Header as='h2'>Welcome!</Header>
                    <p>
                        Please enable us to use browser location, to provide this awesome service of healthcare.
                    </p>
                    <Form>
                        <Form.Field>
                            <label>Your name</label>
                            <input onChange={this.nameChanged.bind(this)} placeholder='Nick or full name'/>
                        </Form.Field>
                        <Button onClick={(event) => {
                            event && event.stopPropagation();
                            cookies.set('name', nameOfInState);
                            this.forceUpdate();
                        }} type='submit'>Go</Button>
                    </Form>
                </Container>
            }
        </div>;
    }
}

export default withCookies(InitUser);
