import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import Firebase from 'firebase';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { user: {}, applications: [], refreshing: false }
    }

    async componentDidMount() {
        this.getCourses();
    }

    async getCourses() {
        var data = await Firebase.auth().currentUser;

        var user = {
            name: data.displayName,
            email: data.email,
            cpf: data.photoURL.split('+')[1],
            number: data.photoURL.split('+')[2],
        };

        this.setState({ user });
        
        var applications = []

        await Firebase.database().ref('courses').on('child_added', snapshot => {
            for(key in snapshot.val().applicants) {
                if(snapshot.val().applicants[key].email == user.email) {
                    applications.push(snapshot.val());
                }
            }
        });
        
        this.setState({ applications });
    }

    logout() {
        Firebase.auth().signOut();
        this.props.navigation.navigate('Login');
    }

    signUpCourse() {
        alert('CAMERA');
    }

    renderItem(item) {
        return (
            <View style={ styles.item }>
                <Text style={[ styles.itemText, styles.title ]}>{ item.name }</Text>
                <Text style={ styles.itemText }>{ item.ministrant }</Text>
            </View>
        );
    }

    render() {
        const emptyList = <View>
            <Text>Você ainda não participou de um curso.</Text>
        </View>

        return (
            <View>
                <ScrollView>
                    <View style={ styles.container }>
                    {/* criação do card */}
                    <View style={ styles.card }>
                        <Text style={ styles.title }>{ this.state.user.name }</Text>
                        <Text>{ this.state.user.email }</Text>
                        <Text>{ this.state.user.cpf }</Text>
                        <Text>{ this.state.user.number }</Text>

                        <View style={{ marginTop: 16 }}>
                            <Button title='Sair' color='#5DAE63' onPress={ () => this.logout() }/>
                        </View>
                    </View>

                    <View style={ styles.button }>
                        <Button title='Cadastrar Minicurso' color='#5DAE63' onPress={ () => this.props.navigation.navigate('Scanner', { user: this.state.user }) }/>
                    </View>

                    <Text style={ styles.title }>Lista de atividades</Text>
                    
                    <FlatList 
                        data={ this.state.applications }
                        ListEmptyComponent={ emptyList }
                        renderItem={ ({item}) => this.renderItem(item) }
                        keyExtractor={ (item, index) => item.name + index }
                        refreshing={ this.state.refreshing }
                        onRefresh={ () => this.getCourses() }
                    />
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
        fontSize: 22
    },
    item: {
        backgroundColor: '#5DAE63',
        padding: 16,
        marginTop: 8,
        borderRadius: 4
    },
    itemText: {
        color: '#ffffff'
    }
});