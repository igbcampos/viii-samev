import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, Alert } from 'react-native';
import Firebase from 'firebase';
import Axios from 'axios';

export default class Notify extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '', description: '' }
    }

    notify = async () => {
        try {
            var title = this.state.title;
            var description = this.state.description;

            Firebase.database().ref('tokens').once('value')
            .then((snapshot) => {
                snapshot.forEach((value) => {
                    notification = {
                        to: value.val().token,
                        title: title,
                        body: description
                    }
                    
                    Axios.post('https://exp.host/--/api/v2/push/send', notification, {
                        headers: {
                            'host': 'exp.host',
                            'accept': 'application/json',
                            'accept-encoding': 'gzip, deflate',
                            'content-type': 'application/json',
                        },
                    });
                });
            });

            Alert.alert(
                'Notificação enviada',
                'A notificação foi enviada com sucesso.',
                [
                    { text: 'OK', onPress: () => this.setState({ title: '', description: '' }) },
                ],
            );
        }
        catch {
            Alert.alert(
                'Notificação não enviada',
                'Ocorreu um erro e não foi possível gerar a notificação. Tente novamente.'
            );
        }
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={ styles.container }>
                        <TextInput
                            style={ styles.input }
                            placeholder='Título da notificação'
                            value={ this.state.title }
                            onChangeText={ (title) => this.setState({title}) } />
                    
                        <TextInput
                            style={ styles.input }
                            placeholder='Descrição da notificação'
                            value={ this.state.description }
                            onChangeText={ (description) => this.setState({description}) } 
                            multiline />

                        <View style={ styles.button }>
                            <Button title='Cadastrar notificação' color='#5DAE63' onPress={ this.notify }/>
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
    input: {
        padding: 8,
        marginHorizontal: 16,
        marginTop: 16,
        borderColor: '#5DAE63',
        borderRadius: 4,
        borderWidth: 1,
        fontSize: 16
    },
    button: {
        margin: 16
    }
});