import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, Alert } from 'react-native';
import Firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Scanner extends Component {
    constructor(props) {
        super(props);

        this.state = { hasCameraPermission: null, scanned: false, user: {} }
    }

    async componentDidMount() {
        var user = this.props.navigation.getParam('user', {});
        this.setState({ user });

        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        
        var key = data.split('+')[0];
        var name = data.split('+')[1];

        Alert.alert(
            'Cadastrar curso',
            'Cadastrar-se no curso ' + name + '?',
            [
                { text: 'Cancelar', onPress: () => this.setState({ scanned: false }) },
                { text: 'OK', onPress: () => this.signUpCourse(key) },
            ],
        );
    };

    signUpCourse(course) {
        var date = new Date();

        data = {
            name: this.state.user.name,
            email: this.state.user.email,
            time: date.toDateString()
        }

        try {
            Firebase.database().ref('courses').child(course).child('applicants').push(data);
            
            Alert.alert(
                'Curso adicionado',
                'Curso adicionado com sucesso.',
                [
                    { text: 'OK', onPress: () => this.props.navigation.goBack() },
                ],
            );
        }
        catch(error) {
            Alert.alert(
                'Curso não adicionado',
                'Ocorreu um erro e não foi possível adicionar o curso. Tente novamente.'
            );
            
            this.setState({ scanned: false })
        }
    }

    render() {
        if (this.state.hasCameraPermission === null) {
            return <Text>Solicitando permissão de câmera.</Text>;
        }
            if (this.state.hasCameraPermission === false) {
            return <Text>O acesso a câmera não foi permitido.</Text>;
        }
        return (
            <View style={ styles.container }>
                <BarCodeScanner
                    onBarCodeScanned={ this.state.scanned ? undefined : this.handleBarCodeScanned }
                    style={ StyleSheet.absoluteFillObject } />

                    <View style={ styles.button }>
                        <Button
                            title='Cancelar'
                            color='#5DAE63'
                            onPress={ () => this.props.navigation.goBack() }/>
                    </View>

                    { this.state.scanned && (
                        <View style={ styles.button }>
                            <Button
                                title='Adicionar outro curso'
                                color='#5DAE63'
                                onPress={() => this.setState({ scanned: false })} />
                        </View>
                    ) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        marginHorizontal: 16,
        marginTop: 16
    },
});