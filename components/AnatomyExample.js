import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Text, List, Button, View, Grid, Col, Row, Footer, FooterTab, Icon } from 'native-base';
import Person from './Person'
import People from './Person';

export default class AnatomyExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            allPeople: [],
            search: "",
            tempSearch: "",
        };
    }

    componentDidMount = () => {
        fetch('https://www.stolaf.edu/directory/search?query=e&format=json', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson = responseJson.results
                responseJson = responseJson.filter(person => person.classYear)

                this.setState({
                    people: responseJson,
                    allPeople: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    people() {

        if (this.state.people == []) {
            return []
        }

        if (this.state.search == "") {
            return []
        }

        filteredPeople = this.state.people.filter(person => person.displayName.includes(this.state.search))

        return filteredPeople.map(person => (
            <Person person={person} key={person.email}></Person>
        ))
    }

    render() {

        return (
            <Container>
                <View style={{ padding: 20 }}>
                    <Item regular>
                        <Input placeholder="Find Someone By Name"
                            onChangeText={tempSearch => this.setState({ tempSearch })}
                        />
                    </Item>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            style={{ width: 85 }}
                            primary
                            onPress={() => this.setState({ search: this.state.tempSearch })}>
                            <Text>Enter</Text>
                        </Button>
                    </View>
                </View>
                <Content>
                    <List>
                        {this.people()}
                    </List>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="apps" />
                            <Text>Find Someone</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="apps" />
                            <Text>My Lists</Text>
                        </Button>
                        {/* <Button vertical active={true}>
                            <Icon name="navigate" />
                            <Text>Navigate</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="person" />
                            <Text>Contact</Text>
                        </Button> */}
                    </FooterTab>
                </Footer>
            </Container >
        );
    }
}