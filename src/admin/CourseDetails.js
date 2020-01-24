import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, Alert } from 'react-native';
import Firebase from 'firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = { course: {}, applicants: [] } 
    }

    componentDidMount() {
        var course = this.props.navigation.getParam('course', {});
        // alert(JSON.stringify(course));
        var applicants = [];

        for(key in course.applicants) {
            var applicant = course.applicants[key];
            applicant.key = key;
            applicants.push(applicant);
        }

        this.setState({ course });
        this.setState({ applicants });
    }

    removeApplicant(applicant) {
        var applicants = this.state.applicants;

        Alert.alert(
            'Remover participante',
            'Remover ' + applicant.name + '?',
            [
                { text: 'Cancelar', onPress: () => {} },
                { text: 'Remover', onPress: () => {
                    Firebase.database().ref('courses').child(this.state.course.key).child('applicants').child(applicant.key).remove()
                    .then(() => {
                        applicants.map((item, index) => {
                            if(applicant.key == item.key) {
                                applicants.splice(index, 1);
                            }
                        });

                        this.setState({ applicants })

                        Alert.alert(
                            'Usuário removido.',
                            'O usuário foi removido com sucesso.'
                        );
                    })
                    .catch(() => {
                        Alert.alert(
                            'Usuário não removido',
                            'Ocorreu um erro e não foi possível remover o usuário.'
                        );
                    });
                } },
            ],
        );
    }

    renderItem(item) {
        return (
            <View style={ styles.item }>
                <MaterialIcons name='close' style={{ marginRight: 16 }} size={ 26 } color='red' onPress={ () => this.removeApplicant(item) } />
                <Text style={ styles.title }>{ item.name }</Text>
            </View>
        );
    }

    render() {
        const emptyList = <View>
            <Text>Ainda não há participantes cadastrados neste curso.</Text>
        </View>

        return (
            <View>
                <ScrollView>
                    <View style={ styles.container }>
                        <Text style={ styles.title }>{ this.state.course.name }</Text>

                        <View style={ styles.button }>
                            <Button title='Adicionar participante' color='#5DAE63' onPress={ () => this.props.navigation.navigate('AddApplicant', { course: this.state.course, applicants: this.state.applicants }) }/>
                        </View>

                        <Text style={ styles.title }>Lista de participantes</Text>

                        <FlatList 
                            data={ this.state.applicants }
                            ListEmptyComponent={ emptyList }
                            renderItem={ ({item}) => this.renderItem(item) }
                            keyExtractor={ (item, index) => item.name + index } />
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
        margin: 16
    },
    card: {
        borderRadius: 4,
        padding: 16,
        elevation: 1
    },
    button: {
        marginVertical: 16,
    },
    title: {
        fontSize: 22,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 8,
        borderColor: '#5DAE63',
        borderRadius: 4,
        borderWidth: 1
    },
});