import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Main from './Main'
import Cam from './Cam'
import Calendar from './Calendar'
import Setting from './Setting'
//import Colors from 'react-native-paper'

const Tab = createMaterialBottomTabNavigator();

export default function StackTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="#FFFFFF"
                shifting={false}
                barStyle={styles.bar}>

                <Tab.Screen
                    name="Home"
                    component={Main}
                    options={{
                        tabBarLabel: 'Home',

                        tabBarIcon: ({ focused }) => (
                            <Icon name="home" size={25} />
                        ),

                    }}
                />

                <Tab.Screen
                    name="Calendar"
                    component={Calendar}
                    options={{
                        tabBarLabel: 'Calendar2',
                        tabBarIcon: () => (
                            <Icon name="calendar-blank" size={25} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Camera"
                    component={Cam}
                    options={{
                        tabBarLabel: 'Camera',
                        tabBarIcon: () => (
                            <Icon name="camera" size={25} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Setting"
                    component={Setting}
                    options={{
                        tabBarLabel: 'Setting',
                        tabBarIcon: () => (
                            <Icon name="cog" size={25} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};


const styles = StyleSheet.create({
    bar: {
        backgroundColor: '#696969', color: 'white'
    }
})