import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";
import { getGeodata } from "../../actions/geodata";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DrawerContent = ({
    navigation,
    user,
    token,
    activeTrackerId,
    logout,
    getGeodata,
}) => {
    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <TouchableNativeFeedback
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <View style={styles.userInfoSection}>
                            <View
                                style={{ flexDirection: "row", marginTop: 15 }}
                            >
                                <Icon name="account" size={50} color="grey" />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={styles.title}>
                                        {user ? user.name : "Загрузка..."}
                                    </Text>
                                    <Text style={styles.caption}>
                                        {user ? user.email : "Загрузка..."}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon name="map" color={color} size={size} />
                        )}
                        label="Map"
                        onPress={() => {
                            navigation.navigate("Home");
                        }}
                        style={styles.mapItem}
                    />
                    {user ? (
                        user.authorizedTrackers.map((tracker) => (
                            <TouchableNativeFeedback
                                key={tracker.id}
                                onPress={() => {
                                    getGeodata(token, tracker.id);
                                    navigation.closeDrawer();
                                }}
                            >
                                <View style={styles.trackerItem}>
                                    <Icon
                                        name="google-maps"
                                        size={26}
                                        color={
                                            tracker.id === activeTrackerId
                                                ? "#2289dc"
                                                : "grey"
                                        }
                                    />
                                    <Text
                                        style={
                                            tracker.id === activeTrackerId
                                                ? styles.activeTrackerText
                                                : styles.trackerText
                                        }
                                    >
                                        {tracker.alias}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        ))
                    ) : (
                        <Text>Загрузка...</Text>
                    )}
                    <TouchableNativeFeedback
                        onPress={() => navigation.navigate("AddTracker")}
                    >
                        <View
                            style={[styles.trackerItem, styles.addTrackerItem]}
                        >
                            <Icon
                                name="plus-circle-outline"
                                size={26}
                                color="grey"
                            />
                            <Text style={styles.trackerText}>Add Tracker</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name="exit-to-app" color={color} size={size} />
                    )}
                    label="Sign Out"
                    onPress={logout}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 10,
        paddingBottom: 5,
        borderBottomColor: "#f4f4f4",
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        marginTop: 5,
        color: "grey",
    },
    mapItem: {
        borderBottomColor: "#f4f4f4",
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    trackerItem: {
        marginLeft: 14,
        marginTop: 10,
        padding: 3,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    trackerText: {
        color: "grey",
        marginLeft: 30,
    },
    activeTrackerText: {
        color: "#2289dc",
        marginLeft: 30,
    },
    addTrackerItem: {
        paddingTop: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
    },
});

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token,
    activeTrackerId: state.geodata.activeTrackerId,
});

export default connect(mapStateToProps, { logout, getGeodata })(DrawerContent);
