import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Text, List } from 'native-base';
import Person from './Person'

export default class AnatomyExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [1, 2, 3, 4],
        };
    }

    componentDidMount = () => {
        fetch('https://www.stolaf.edu/directory/search?query=e&format=json', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson = responseJson.results.slice(1, 10)
                this.setState({
                    people: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        const people = this.state.people.map(person => (
            <Person person={person} key={person.email}>
            </Person>
        ))

        return (
            <Container>
                <Item regular>
                    <Input placeholder="Search" />
                </Item>
                <Content>
                    <List>
                        {people}
                    </List>
                </Content>
            </Container>
        );
    }
}