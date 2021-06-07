import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { login } from "../actions/auth";
import { connect } from "react-redux";

function Login({ login, navigation }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onChange = (value: any, field: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const navigate = () => {
        navigation.navigate('Register');
    }

    // "bruh@duh.com", "12345"
    const onSubmit = () => {
        if (!formData.email || !formData.password) {
            Alert.alert(
                "Can't be empty!",
                "Email and password can't be empty!"
            );
            return;
        }
        login(formData.email, formData.password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.padding20}>
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
                <Button title="Login" onPress={onSubmit} />
                <View style={styles.touchable}>
                    <TouchableNativeFeedback onPress={navigate}>
                        <Text style={styles.text}>
                            Don't have an account yet? Sign up
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

export default connect(null, { login })(Login);
