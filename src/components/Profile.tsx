import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Profile({ user, logout }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.credentials}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
                <View>
                    <Text style={styles.authorized}>Authorized Trackers</Text>
                    {user.authorizedTrackers.map((tracker) => (
                        <View key={tracker.id} style={styles.tracker}>
                            <Icon name="google-maps" size={26} color="grey" />
                            <Text>
                                Tracker "{tracker.alias}" with ID "{tracker.id}"
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
    },
    content: {
        paddingBottom: 20,
    },
    name: {
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 5,
    },
    email: {
        fontSize: 16,
        color: "black",
    },
    credentials: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomColor: "#c4c4c4",
        borderBottomWidth: 1,
    },
    authorized: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 20,
    },
    tracker: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: 30,
    },
});

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Profile);
