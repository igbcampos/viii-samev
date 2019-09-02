import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import Firebase from 'firebase';

export default class Notify extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '', description: '' }
    }

    notify() {
        this.setState({ title: '' }, { description: '' })
    }

    render() {
        return (
            <View style={ styles.container }>
                <ScrollView>
                    <TextInput
                        placeholder='Título da notificação'
                        value={ this.state.title }
                        onChangeText={ (title) => this.setState({title}) } />
                
                    <TextInput
                        placeholder='Descrição da notificação'
                        value={ this.state.description }
                        onChangeText={ (description) => this.setState({description}) } 
                        multiline />

                    <View>
                        <Button title='Cadastrar Minicurso' onPress={ this.notify }/>
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
});