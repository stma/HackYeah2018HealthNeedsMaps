import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import {Container, Icon, Grid, Button, Header} from 'semantic-ui-react';

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

        return <Container style={{paddingTop: 30}} fluid>
            <Grid centered>
                <Grid.Row onClick={this.toggle.bind(this, 'R')} >
                    <Icon size="massive" name="sign language" color={this.state.chR ? 'teal' : ''} /><Header>Rating</Header>
                </Grid.Row>
                <Grid.Row onClick={this.toggle.bind(this, 'Q')}>
                    <Icon size="massive" color={this.state.chQ ? 'teal' : ''} name="stopwatch" /><Header>Queue</Header>
                </Grid.Row>
                <Grid.Row onClick={this.toggle.bind(this, 'S')}>
                    <Icon size="massive" color={this.state.chS ? 'teal' : ''} name="euro sign" /><Header>State/Private institute</Header>
                </Grid.Row>
            </Grid>
            <Button type='submit' style={{float: 'right', marginTop: 30}}
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
