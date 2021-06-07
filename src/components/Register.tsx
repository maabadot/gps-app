import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { register } from "../actions/auth";

function Register({ navigation, register }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const onChange = (value: any, field: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const navigate = () => {
        navigation.goBack();
    };

    const onSubmit = () => {
        register(formData.email, formData.password, formData.name);
    };

    return (
        <View style={styles.container}>
            <View style={styles.padding20}>
                <Input
                    label="Your Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChangeText={(value) => onChange(value, "name")}
                />
                <Input
                    label="Your Email"
                    placeholder="email@address.com"
                    value={formData.email}
                    onChangeText={(value) => onChange(value, "email")}
                />
                <Input
                    label="Password"
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(value) => onChange(value, "password")}
                    secureTextEntry={true}
                />
                <Button title="Register" onPress={onSubmit} />
                <View style={styles.touchable}>
                    <TouchableNativeFeedback onPress={navigate}>
                        <Text style={styles.text}>
                            Already have an account? Sign in
                        </Text>
                    </TouchableNativeFeedback>
                </View>
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
    touchable: {
        paddingTop: 20,
        flex: 1,
        alignItems: "center",
    },
    text: {
        color: "#2289dc",
    },
});

export default connect(null, { register })(Register);
