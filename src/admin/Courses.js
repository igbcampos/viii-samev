import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Firebase from 'firebase';

export default class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = { courses: [] } 
    }

    componentDidMount = async () => {
        var data = []

        Firebase.database().ref('courses').orderByChild('name').on('child_added', snapshot => {
            data.push(snapshot.val());
        });
        
        this.setState({ courses: data });
    }

    renderItem(item) {
        return (
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('CourseDetails', { course: item }) }>
                <View>
                    <Text>{ item.name }</Text>
                    <Text>{ item.ministrant }</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const emptyList = <View>
            <Text>Ainda não há cursos cadastrados.</Text>
        </View>

        return (
            <View style={ styles.container }>
                <ScrollView>           
                    <View>
                        <Button 
                            title='Adicionar curso' 
                            onPress={ () => {this.props.navigation.navigate('AddCourse')} } />
                    </View>

                    <FlatList 
                        data={ this.state.courses }
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