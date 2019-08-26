import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import Firebase from 'firebase';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { user: { name: "Jair", email: "fjair123@gmail.com", cpf: "12345678936", number: "202910" } }
    }

    cadastrarMinucurso()
    {
        alert("CAMERA")
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* criação do card */}
                <View>
                    <Text>{this.state.user.name}</Text>
                    <Text>{this.state.user.email}</Text>
                    <Text>{this.state.user.cpf}</Text>
                    <Text>{this.state.user.number}</Text>
                </View>

                <Button title="Cadastrar Minicurso" onPress={this.cadastrarMinucurso}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});