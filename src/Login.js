import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import Firebase from 'firebase';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { email: '', password: '', status: '' }
    }

    //Fazer login
    async login() {
        <ActivityIndicator size='large' />

        await Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {

                // user.user.updateProfile({
                //     displayName: 'Gabriel Costa Campos',
                //     photoURL: 'user',
                // });

                // user.user.updatePhoneNumber = '06487654321';

                if (user.user.photoURL == 'user') {
                    this.props.navigation.navigate('UserHome');
                }
                else if (user.user.photoURL == 'admin') {
                    this.props.navigation.navigate('AdminHome');
                }

                // Firebase.database().ref('/users/').once('value')
                // .then((snapshot) => {
                //     console.log(JSON.stringify(snapshot));
                //     snapshot.val().map((data) => {
                //         console.log(JSON.stringify(snapshot));
                //         // if(data.email == user.email) {
                //         //     if(data.bond == 'user') {
                //         //         this.props.navigation.navigate('UserHome');
                //         //     }
                //         //     else if(data.bond == 'admin') {
                //         //         this.props.navigation.navigate('AdminHome');
                //         //     }
                //         // }
                //     });
                // });
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    this.setState({ status: 'Esse não é um formato de email válido.' });
                }
                else if (error.code === 'auth/user-not-found') {
                    this.setState({ status: 'Esse email não pertence a nenhum usuário cadastrado.' });
                }
                else if (error.code === 'auth/wrong-password') {
                    this.setState({ status: 'A senha está incorreta.' });
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.titleText}>Faça Seu Login</Text>

                <TextInput

                    style={{ height: 40, borderColor: 'white', borderWidth: 20, justifyContent: 'center', }}

                    placeholder='E-Mail'
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoCapitalize='none' />

                <TextInput

                    style={{ height: 40, borderColor: 'white', borderWidth: 20, justifyContent: 'center', }}

                    placeholder='Senha'
                    value={this.state.password}
                    onChangeText={(password) => { this.setState({ password }) }}
                    secureTextEntry />

                <Text>{this.state.status}</Text>

                <View style={styles.fixToText}>
                    <Button
                        icon={{
                            name: "arrow-right",
                            size: 15,
                            color: "white"
                        }}
                        title='Entrar'
                        onPress={() => { this.login() }} />
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

    title: {
        textAlign: 'center',
        marginVertical: 8,
    },

    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});