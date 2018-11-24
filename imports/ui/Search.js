import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import {Container, Header, Form, Button} from 'semantic-ui-react';

class Search extends Component {

    search() {

    }

    render() {
        const {cookies} = this.props;

        const nameOf = cookies.get('name');

        if (!nameOf)
            return <Redirect to='/' />;

        return <Container fluid>
            <Header as='h2'>Welcome!</Header>
            <p>
                Please enable us to use browser location, to provide this awesome service of healthcare.
            </p>
            <Form>
                <Form.Field>
                    <label>Your problem</label>
                    <input onChange={this.search.bind(this)} placeholder='Nick or full name' />
                </Form.Field>
                <Button onClick={(event) => {event && event.stopPropagation(); cookies.set('name', nameOfInState); this.forceUpdate();}} type='submit'>Go</Button>
            </Form>
        </Container>;
    }
}

export default withCookies(Search);
