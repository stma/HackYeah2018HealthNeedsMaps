import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import {Container, Header, Form, Button} from 'semantic-ui-react';

class Search extends Component {

    searchChanged(event) {
        const searchText = event.target.value;
        this.setState({searchText});
    }

    render() {
        const {cookies} = this.props;

        const nameOf = cookies.get('name');

        if (!nameOf)
            return <Redirect to='/' />;

        return <Container fluid>
            <Header as='h2'>Welcome {nameOf}!</Header>
            <Form>
                <Form.Field>
                    <label>Your problem:</label>
                    <input onChange={this.searchChanged.bind(this)} placeholder='Type your problem or service you want' />
                </Form.Field>
                <Button
                    onClick={
                        (event) => {
                            event && event.stopPropagation();
                            this.props.history.push(`/sort/${encodeURIComponent(this.state.searchText)}`);
                        }
                    }
                    type='submit'
                >
                    Search
                </Button>
            </Form>
        </Container>;
    }
}

export default withRouter(withCookies(Search));
