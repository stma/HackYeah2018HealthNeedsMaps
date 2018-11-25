import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import {Container, Header, List, Form, Button} from 'semantic-ui-react';

import {getLocation} from './Utils';
import {benefitList} from './SearchTextMap';


class Search extends Component {

    state = {searchText: ''};

    componentDidMount() {
        getLocation();
    }

    searchChanged(event) {
        const searchText = event.target.value;
        this.setState({searchText});
    }

    render() {
        const {cookies} = this.props;

        const nameOf = cookies.get('name');
        const test = new RegExp(this.state.searchText || '', 'i');

        if (!nameOf)
            return <Redirect to='/' />;

        return <Container fluid>
            <Header as='h2'>Welcome {nameOf}!</Header>
            <Form>
                <Form.Field>
                    <label>Your problem:</label>
                    <input onChange={this.searchChanged.bind(this)} placeholder='Type your problem or service you want' />
                </Form.Field>
                <List divided relaxed>
                    {
                        benefitList.filter((f) => test.test(f)).map((item, key) =>
                            <List.Item key={key} onClick={(event) => {
                                event && event.stopPropagation();
                                this.props.history.push(`/sort/${encodeURIComponent(item)}`);
                            }}>
                                <List.Content>
                                    <List.Header as='a'>{item}</List.Header>
                                </List.Content>
                            </List.Item>
                        )
                    }
                </List>
            </Form>
        </Container>;
    }
}

export default withRouter(withCookies(Search));
