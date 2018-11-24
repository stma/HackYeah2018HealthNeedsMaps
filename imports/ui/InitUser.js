import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import {Redirect} from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import uuid from 'uuid/v4';
import {Header, Container, Form, Button} from 'semantic-ui-react';


class InitUser extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {nameOf: ''};
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
    }

    render() {
        const { cookies } = this.props;
        const { nameOfInState } = this.state;

        const nameOf = cookies.get('name');

        if (nameOf)
            return <Redirect to='/search' />;

        return <Container fluid>
            <Header as='h2'>Welcome!</Header>
            <p>
                Please enable us to use browser location, to provide this awesome service of healthcare.
            </p>
            <Form>
                <Form.Field>
                    <label>Your name</label>
                    <input onChange={this.nameChanged.bind(this)} placeholder='Nick or full name' />
                </Form.Field>
                <Button onClick={(event) => {event && event.stopPropagation(); cookies.set('name', nameOfInState); this.forceUpdate();}} type='submit'>Go</Button>
            </Form>
        </Container>;
    }
}

export default withCookies(InitUser);
