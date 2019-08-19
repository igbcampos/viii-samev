import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Firebase from 'firebase';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { email: '', senha: '' }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>

                <TextInput placeholder="E-Mail" onChange={ (valor) => {this.setState({email:valor})} } value={ this.state.email } />

                <TextInput placeholder="Senha" secureTextEntry= {(true)} onChange={ (valor) => {this.setState({senha:valor})} } value={ this.state.senha } />
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
