import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import Firebase from 'firebase';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { user: {} }
    }

    async componentDidMount() {
        var data = await Firebase.auth().currentUser;

        var user = {
            name: data.displayName,
            email: data.email,
        };

        this.setState({ user })
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
            <View>
                <ScrollView>
                    <View style={ styles.container }>
                        <View style={ styles.card }>
                            <Text style={ styles.title }>{ this.state.user.name }</Text>
                            <Text>{ this.state.user.email }</Text>

                            <View style={{ marginTop: 16 }}>
                                <Button title='Sair' color='#5DAE63' onPress={ () => this.logout() }/>
                            </View>
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
        margin: 16
    },
    card: {
        borderRadius: 4,
        padding: 16,
        elevation: 1
    },
    button: {
        marginVertical: 16,
    },
    title: {
        fontSize: 22
    }
});