import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';
import { Input, Item, Button, Right, Thumbnail, Body, ListItem, StyleProvider, Container, Header, Content, Card, CardItem, Icon, Left} from 'native-base';
import axios from 'axios';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

export default class CarouselScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            categories_list: {},
            category_images: {
                Vegetais: 'https://img.icons8.com/cotton/100/000000/lettuce.png',
                Frutas: 'https://img.icons8.com/cotton/100/000000/lettuce.png',
                Salgados: 'https://img.icons8.com/cotton/100/000000/lettuce.png',
                Doces: 'https://img.icons8.com/cotton/100/000000/lettuce.png',
                "Feito em Casa": 'https://img.icons8.com/cotton/100/000000/lettuce.png',
            }
        }
    }

    onLogin = () => {

        console.log("email: " + String(this.state.email) + " password: " + String(this.state.password));

        axios.post('https://food-miles.herokuapp.com/login', {
            login: this.state.login, 
            senha: this.state.senha,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getData() {
      axios.get('https://food-miles.herokuapp.com/categories')
        .then(response => response.data)
        .then((response) =>  {
          this.setState({...this.state, categories_list: response});
        })
        .catch((error) => {
          console.error(error);
        })
    }

    componentDidMount(){
      this.getData();
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.v5}>
                    <Text> </Text>
                </View>

                <ListItem transparent avatar>
                    <Left>
                        <Thumbnail source={{ uri: 'https://i.imgur.com/WJOAW4E.png' }} />
                    </Left>
                    <Body>
                        <Text> </Text>
                        <Text note> </Text>
                    </Body>
                    <Right>
                        <Thumbnail source={{ uri: 'https://i.imgur.com/vlNOtMM.png' }} />
                    </Right>
                </ListItem>

                <Header transparent searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                    </Item>
                    <Button transparent>
                        <Text>Buscar produtos e lojinhas</Text>
                    </Button>
                </Header>

                <ScrollView horizontal>
                    {
                        Object.keys(this.state.categories_list).map((category) => (
                            <View key={category}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Vegetables', {
                                        products_list: this.state.categories_list[category],
                                        category: category,
                                    })}>
                                    <Image source={{ uri: this.state.category_images[category]}} style={styles.v6}/>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>

                <View style={styles.MainContainer}>
                    <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
                        <Image source={{ uri:'http://aboutreact.com/wp-content/uploads/2018/08/facebook.png.png',}} style={styles.ImageIconStyle}/>
                        <View style={styles.SeparatorLine} />
                        <Text style={styles.TextStyle}> Login Using Facebook </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

//ESTILOS PARA CADA UM DOS COMPONENTES
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7ED',
    },
    v1: {
        height: 80,
        width: 80,
        backgroundColor: '#F4F7ED',
    },
    v2: {
        flex: 1,
        color: '#7FA99B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    v4: {
        height: 44,
        width: 385,
        backgroundColor: '#7FA99B',
        borderRadius: 30,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    v5: {
        color: '#7FA99B',
    },
    v6: {
        height: 120,
        width: 120,
        borderColor: '#FFD54D',
        borderRadius: 90,
        margin: 30,
        borderWidth: 4,
    },
    v7: {
        height: 80,
        width: 80,
    },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },

      GooglePlusStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc4e41',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: 220,
        borderRadius: 5,
        margin: 5,
      },

      FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: 220,
        borderRadius: 5,
        margin: 5,
      },

      ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
      },

      TextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginRight: 20,
      },

      SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40,
      },
});
