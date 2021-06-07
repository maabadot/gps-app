import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { connect } from "react-redux";
import { addTracker } from "../actions/auth";
import { getGeodata } from '../actions/geodata';
import { Input, Button } from "react-native-elements";
// import { useNavigation } from "@react-navigation/native";

function AddTracker({ auth, addTracker, getGeodata }) {
    // const navigation = useNavigation();

    const [formData, setFormData] = useState({
        id: "",
        password: "",
        alias: "",
    });

    const onChange = (value: any, field: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const onSubmit = () => {
        if (!formData.id || !formData.password) {
            Alert.alert("Can't be empty!", "Password and ID can't be empty!");
            return;
        }
        addTracker(formData.id, formData.password, formData.alias, auth.token);
        // getGeodata(auth.token, formData.id);
        // navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <View style={styles.padding20}>
                <Input
                    label="Tracker ID"
                    placeholder="Tracker ID"
                    value={formData.id}
                    onChangeText={(value) => {
                        onChange(value, "id");
                    }}
                />
                <Input
                    label="Tracker Password"
                    placeholder="Tracker Password"
                    value={formData.password}
                    onChangeText={(value) => {
                        onChange(value, "password");
                    }}
                />
                <Input
                    label="Alias"
                    placeholder="Alias"
                    value={formData.alias}
                    onChangeText={(value) => {
                        onChange(value, "alias");
                    }}
                />
                <Button title="Add Tracker" onPress={onSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    padding20: {
        padding: 20,
    },
});

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { addTracker, getGeodata })(AddTracker);
