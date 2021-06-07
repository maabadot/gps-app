import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from "react-redux";

import DrawerContent from "./navigation/DrawerContent";
import {
    HomeStackScreen,
    ProfileStackScreen,
    AddTrackerStackScreen,
} from "./StackScreens";
import Login from './Login';
import Register from './Register';

const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();

const AppContainer = ({ auth }) => {
    return (
        <NavigationContainer>
            {auth.isAuthenticated ? (
                <Drawer.Navigator
                    drawerContent={(props) => <DrawerContent {...props} />}
                >
                    <Drawer.Screen name="Home" component={HomeStackScreen} />
                    <Drawer.Screen
                        name="Profile"
                        component={ProfileStackScreen}
                    />
                    <Drawer.Screen
                        name="AddTracker"
                        component={AddTrackerStackScreen}
                    />
                </Drawer.Navigator>
            ) : (
                <AuthStack.Navigator>
                    <AuthStack.Screen name="Login" component={Login} />
                    <AuthStack.Screen name="Register" component={Register} />
                </AuthStack.Navigator>
            )}
        </NavigationContainer>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(AppContainer);
