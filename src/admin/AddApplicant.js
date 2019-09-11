import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import Firebase from 'firebase';

export default class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = { user: '', users: [], course: {}, applicants: [], refreshing: false };
    }

    async componentDidMount() {
        var course = this.props.navigation.getParam('course', {});
        var applicants = this.props.navigation.getParam('applicants', []);

        this.setState({ course });
        this.setState({ applicants });

        this.getUsers();
    }

    async getUsers() {
        var users = [];

        await Firebase.database().ref('users').once('value')
        .then((snapshot) => {
            snapshot.forEach((value) => {
                var flag = 0;

                this.state.applicants.map((applicant) => {
                    if(applicant.email == value.val().email) {
                        flag += 1;
                    }
                });

                if(flag == 0) {
                    users.push(value.val());
                }
            });
        });

        this.setState({ users });
    }

    addApplicant(user) {
        var date = new Date();

        var data = {
            name: user.name,
            email: user.email,
            time: date.toDateString()
        }

        try {
            Firebase.database().ref('courses').child(this.state.course.key).child('applicants').push(data);
            
            Alert.alert(
                'Participante adicionado',
                'Participante adicionado com sucesso.',
                [
                    { text: 'OK', onPress: () => this.props.navigation.goBack() },
                ],
            );
        }
        catch(error) {
            Alert.alert(
                'Participante não adicionado',
                'Ocorreu um erro e não foi possível adicionar o participante. Tente novamente.'
            );
        }
    }

    askBeforeAdd(user) {
        Alert.alert(
            'Adicionar participante',
            'Adicionar ' + user.name + ' ao curso?',
            [
                { text: 'Cancelar', onPress: () => {} },
                { text: 'OK', onPress: () => this.addApplicant(user) },
            ],
        );
    }

    renderItem(item) {
        if(item.name.toLowerCase().includes(this.state.user.toLowerCase()) || item.email.toLowerCase().includes(this.state.user.toLowerCase()) || item.cpf.includes(this.state.user)) {
            return (
                <TouchableOpacity onPress={ () => this.askBeforeAdd(item) }>    
                    <View style={ styles.item }>
                        <Text style={ styles.title }>{ item.name }</Text>
                        <Text>{ item.email }</Text>
                    </View>
                </TouchableOpacity>
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
            <View>
                {/* <Text>{ this.state.course.name }</Text> */}
                
                <TextInput  
                    style={ styles.input }
                    placeholder='Buscar'
                    value={ this.state.user }
                    clearButtonMode='always'
                    onChangeText={ (user) => this.setState({user}) } />

                <ScrollView>
                    <View style={ styles.container }>
                        <FlatList 
                            data={ this.state.users }
                            ListEmptyComponent={ emptyList }
                            renderItem={ ({item}) => this.renderItem(item) }
                            keyExtractor={ (item, index) => item.name + index }
                            refreshing={ this.state.refreshing }
                            onRefresh={ () => this.getUsers() } />
                    </View>
                </ScrollView>

                {/* <View>
                    <Button title='Adicionar participante' color='#5DAE63' onPress={ this.addApplicant }/>
                </View> */}
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
    input: {
        padding: 8,
        marginTop: 16,
        marginHorizontal: 16,
        borderColor: '#5DAE63',
        borderRadius: 4,
        borderWidth: 1,
        fontSize: 16
    },
    button: {
        marginVertical: 16,
    },
    title: {
        fontSize: 22,
    },
    item: {
        padding: 16,
        marginTop: 8,
        borderColor: '#5DAE63',
        borderRadius: 4,
        borderWidth: 1
    },
});