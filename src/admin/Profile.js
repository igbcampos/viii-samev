import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import Firebase from 'firebase';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { user: {name: 'Jair', email: 'fjair123@gmail.com', cpf: '12345678936', number: '202910'} }
    }

    logout() {
        Firebase.auth().signOut();
        this.props.navigation.navigate('Login');
    }

    render() {
        const emptyList = <View>
            <Text>Você ainda não participou de um curso.</Text>
        </View>

        return (
            <View style={ styles.container }>
                <ScrollView>
                    <View>
                        <Text>{ this.state.user.name }</Text>
                        <Text>{ this.state.user.email }</Text>
                        <Text>{ this.state.user.cpf }</Text>
                        <Text>{ this.state.user.number }</Text>

                        <View>
                            <Button title='Sair' onPress={ () => this.logout() }/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});