import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import Firebase from 'firebase';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { user: {name: 'Jair', email: 'fjair123@gmail.com', cpf: '12345678936', number: '202910', applications: [{name: 'Palestra 1', ministrant: 'Pessoa 1'}, {name: 'Palestra 1', ministrant: 'Pessoa 1'}]} }
    }

    cadastrarMinucurso() {
        alert('CAMERA');
    }

    renderItem(item) {
        return (
            <View>
                <Text>{ item.name }</Text>
                <Text>{ item.ministrant }</Text>
            </View>
        );
    }

    render() {
        const emptyList = <View>
            <Text>Você ainda não participou de um curso.</Text>
        </View>

        return (
            <View style={ styles.container }>
                <ScrollView>
                    {/* criação do card */}
                    <View>
                        <Text>{ this.state.user.name }</Text>
                        <Text>{ this.state.user.email }</Text>
                        <Text>{ this.state.user.cpf }</Text>
                        <Text>{ this.state.user.number }</Text>
                    </View>

                    <Button title='Cadastrar Minicurso' onPress={ this.cadastrarMinucurso }/>

                    <Text>Lista de atividades</Text>
                    
                    <FlatList 
                        data={ this.state.user.applications }
                        ListEmptyComponent={ emptyList }
                        renderItem={ ({item}) => this.renderItem(item) }
                        keyExtractor={ (item, index) => item.name + index }
                    />
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