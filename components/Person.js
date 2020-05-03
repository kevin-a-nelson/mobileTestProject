import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Badge, Item } from 'native-base';

// import * as axios from 'axios';

export default class People extends Component {
    render() {

        const { person } = this.props

        return (
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: person.thumbnail }} />
                </Left>
                <Body>
                    <Text>{person.displayName}</Text>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>Add</Text>
                    </Button>
                </Right>
            </ListItem>
        );
    }
}