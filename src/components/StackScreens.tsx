import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./Home";
import Profile from "./Profile";
import AddTracker from "./AddTracker";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AddTrackerStack = createStackNavigator();

export const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
                headerLeft: () => (
                    <TouchableNativeFeedback
                        onPress={() => navigation.openDrawer()}
                    >
                        <Icon
                            style={{ paddingLeft: 20 }}
                            name="menu"
                            size={28}
                            color="black"
                        />
                    </TouchableNativeFeedback>
                ),
            })}
        />
    </HomeStack.Navigator>
);

export const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            name="Profile"
            component={Profile}
            options={({ navigation }) => ({
                headerLeft: () => (
                    <TouchableNativeFeedback
                        onPress={() => navigation.openDrawer()}
                    >
                        <Icon
                            style={{ paddingLeft: 20 }}
                            name="menu"
                            size={28}
                            color="black"
                        />
                    </TouchableNativeFeedback>
                ),
            })}
        />
    </ProfileStack.Navigator>
);

export const AddTrackerStackScreen = () => (
    <AddTrackerStack.Navigator>
        <AddTrackerStack.Screen
            name="AddTracker"
            component={AddTracker}
            options={({ navigation }) => ({
                title: "Add Tracker",
                headerLeft: () => (
                    <TouchableNativeFeedback
                        onPress={() => navigation.openDrawer()}
                    >
                        <Icon
                            style={{ paddingLeft: 20 }}
                            name="menu"
                            size={28}
                            color="black"
                        />
                    </TouchableNativeFeedback>
                ),
            })}
        />
    </AddTrackerStack.Navigator>
);
