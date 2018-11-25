import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import {Container, Checkbox, Form, Button} from 'semantic-ui-react';

import {getLocation} from './Utils';


class SortBy extends Component {

    state = { chR: false, chQ: false, chS: false};

    toggle = (name) => this.setState({[`ch${name}`]: !this.state[`ch${name}`]});

    componentDidMount() {
        getLocation();
    }

    render() {
        const {cookies} = this.props;

        const nameOf = cookies.get('name');

        if (!nameOf)
            return <Redirect to='/' />;

        return <Container fluid>
            <Form>
                <Checkbox label='Rating' onChange={this.toggle.bind(this, 'R')} checked={this.state.chR} toggle />
                <Checkbox label='Queue' onChange={this.toggle.bind(this, 'Q')} checked={this.state.chQ} toggle />
                <Checkbox label='State/Private institute' onChange={this.toggle.bind(this, 'S')} checked={this.state.chS} toggle />
            </Form>
            <Button type='submit'
                onClick={
                    (event) => {
                        event && event.stopPropagation();
                        this.props.history.push(`/map/${this.props.match.params.search}/${this.state.chR ? 'R' : 'r' + this.state.chQ ? 'Q' : 'q' + this.state.chS ? 'S' : 's'}`);
                    }
                }
            >
                Go
            </Button>
        </Container>;
    }
}

export default withRouter(withCookies(SortBy));
