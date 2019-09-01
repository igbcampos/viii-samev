import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Firebase from 'firebase';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { email: '', password: '' }
    }

    //Fazer login
    login() {
        Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            alert('DEU CERTO UHUUUUUUUUUUUUU');
            this.props.navigation.navigate('Home');
        })
        .catch((error) => {
            alert('Algo deu errado.');
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Faça Seu Login</Text>

                <TextInput 
                    placeholder='E-Mail'  
                    value={ this.state.email }
                    onChangeText={ (email) => this.setState({ email }) }
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoCapitalize='none' /> 

                <TextInput 
                    placeholder='Senha'  
                    value={ this.state.password }
                    onChangeText={ (password) => { this.setState({ password }) }}
                    secureTextEntry />

                <View>
                    <Button 
                        title='Entrar' 
                        onPress={ () => {this.login()} } />
                </View>
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