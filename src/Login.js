import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Firebase from 'firebase';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = { email: '', senha: '' }
    }

    //Fazer login
    fazerLogin() {

        Firebase.auth.signInWithEmailAndPassword("this.state.email", "this.state.senha").catch(function (error) {
            alert("DEU CERTO UHUUUUUUUUUUUUU");
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Faça Seu Login</Text>

                <TextInput placeholder="E-Mail" onChangeText={valor => this.setState({ email: valor })} value={this.state.email} />

                <TextInput placeholder="Senha" secureTextEntry={(true)} onChange={(valor) => { this.setState({ senha: valor }) }} value={this.state.senha} />

                <Button title="Entrar" onPress={() => this.fazerLogin()} />
            </View>
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