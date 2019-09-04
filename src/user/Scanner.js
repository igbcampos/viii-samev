import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import Firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Scanner extends Component {
    constructor(props) {
        super(props);

        this.state = { hasCameraPermission: null, scanned: false, email: 'jair@email.com' }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        this.signUpCourse(data);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    signUpCourse(course) {
        var date = new Date();

        data = {
            email: this.state.email,
            time: date.getTime()
        }

        Firebase.database().ref('courses').child(course).child('applicants').push(data);
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

                    <Button
                        title='Cancelar'
                        onPress={ () => this.props.navigation.goBack() }/>

                    { this.state.scanned && (
                        <Button
                            title={'Tap to Scan Again'}
                            onPress={() => this.setState({ scanned: false })} />
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
});