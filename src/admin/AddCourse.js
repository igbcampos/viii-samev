import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import Firebase from 'firebase';

export default class AddCourse extends Component {
    constructor(props) {
        super(props);

        this.state = { name: '', ministrant: '' } 
    }

    addCourse() {
        data = {
            name: this.state.name,
            ministrant: this.state.ministrant,
            applicants: []
        }

        try {
            Firebase.database().ref('courses').push(this.state);
            
            Alert.alert(
                'Curso adicionado',
                'Curso adicionado com sucesso.',
                [
                    { text: 'OK', onPress: () => this.props.navigation.goBack() },
                ],
            );
        } 
        catch {
            Alert.alert(
                'Curso não adicionado',
                'Ocorreu um erro e não foi possível adicionar o curso.'
            );
        }
    }

    render() {
        const emptyList = <View>
            <Text>Ainda não há cursos cadastrados.</Text>
        </View>

        return (
            <View>
                <ScrollView>
                    <View style={ styles.container }>
                        <TextInput
                            style={ styles.input } 
                            placeholder='Nome'  
                            value={ this.state.name }
                            onChangeText={ (name) => this.setState({ name }) } />
                            
                        <TextInput 
                            style={ styles.input }
                            placeholder='Ministrante'  
                            value={ this.state.ministrant }
                            onChangeText={ (ministrant) => this.setState({ ministrant }) } />             

                        <View style={ styles.button }>
                            <Button 
                                title='Adicionar curso'
                                color='#5DAE63' 
                                onPress={ () => {this.addCourse()} } />
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