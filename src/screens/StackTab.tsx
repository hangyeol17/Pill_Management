import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Main from './Main'
import Cam from './Cam'
import Calendar from './Calendar'
import User from './User'

const Tab = createMaterialBottomTabNavigator();

export default function StackTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#FFFFFF"
            shifting={false}
            barStyle={styles.bar}>

            <Tab.Screen
                name="Home"
                component={Main}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <Icon name="home" size={25} />
                    ),
                }}
            />

            <Tab.Screen
                name="Calendar"
                component={Calendar}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <Icon name="calendar-blank" size={25} />
                    ),
                }}
            />

            <Tab.Screen
                name="Camera"
                component={Cam}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <Icon name="camera" size={25} />
                    ),
                }}
            />


            <Tab.Screen
                name="User"
                component={User}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <Icon name="account" size={25} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};


const styles = StyleSheet.create({
    bar: {
        backgroundColor: '#696969', color: 'white', height: '7.5%'
    }
})