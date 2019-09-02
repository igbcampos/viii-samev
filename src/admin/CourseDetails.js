import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import Firebase from 'firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = { course: {name: 'Palestra 1', ministrant: 'Pessoa 1', applicants: [{name: 'Gabriel'}, {name: 'Jair'}]} } 
    }

    removeApplicant() {
        alert('removendo...')
    }

    renderItem(item) {
        return (
            <View>
                <Text>{ item.name }</Text>
                <MaterialIcons name='close' size={ 26 } color='red' onPress={ () => this.removeApplicant() } />
            </View>
        );
    }

    render() {
        const emptyList = <View>
            <Text>Ainda não há participantes cadastrados neste curso.</Text>
        </View>

        return (
            <View style={ styles.container }>
                <ScrollView>
                    <Text>{ this.state.course.name }</Text>

                    <View>
                        <Button title='Adicionar participante' onPress={ () => this.props.navigation.navigate('AddApplicant') }/>
                    </View>

                    <FlatList 
                        data={ this.state.course.applicants }
                        ListEmptyComponent={ emptyList }
                        renderItem={ ({item}) => this.renderItem(item) }
                        keyExtractor={ (item, index) => item.name + index } />
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