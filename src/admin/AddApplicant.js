import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import Firebase from 'firebase';

export default class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = { user: '', course: {name: 'Palestra 1', ministrant: 'Pessoa 1'}, users: [{name: 'Jair', email: 'fjair123@gmail.com', cpf: '12345678936', number: '202910'}, {name: 'Gabriel', email: 'gabriel@gmail.com', cpf: '06412345678', number: '1234'}] } 
    }

    addApplicant() {
        alert('Adicionando');
    }

    renderItem(item) {
        if(item.name.toLowerCase().includes(this.state.user.toLowerCase()) || item.email.toLowerCase().includes(this.state.user.toLowerCase()) || item.cpf.toLowerCase().includes(this.state.user.toLowerCase())) {
            return (
                <View>
                    <Text>{ item.name }</Text>
                    <Text>{ item.email }</Text>
                </View>
            );
        }
        else {
            return;
        }
    }

    render() {
        const emptyList = <View>
            <Text>Ainda não há participantes cadastrados neste curso.</Text>
        </View>

        return (
            <View style={ styles.container }>
                <Text>{ this.state.course.name }</Text>
                
                <TextInput 
                    placeholder='Buscar'
                    value={ this.state.user }
                    clearButtonMode='always'
                    onChangeText={ (user) => this.setState({user}) } />

                <ScrollView>
                    <FlatList 
                        data={ this.state.users }
                        ListEmptyComponent={ emptyList }
                        renderItem={ ({item}) => this.renderItem(item) }
                        keyExtractor={ (item, index) => item.name + index } />
                </ScrollView>

                <View>
                    <Button title='Adicionar participante' onPress={ this.addApplicant }/>
                </View>
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