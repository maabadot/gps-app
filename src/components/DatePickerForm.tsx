import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { getGeodata } from "../actions/geodata";
const moment = require("moment");

function DatePickerForm({token, tracker, getGeodata}) {
    const [formData, setFormData] = useState({
        fromDate: new Date(),
        fromTime: new Date(),
        toDate: new Date(),
        toTime: new Date(),
    });
    const [mode, setMode] = useState<"date" | "time">("date");
    const [show, setShow] = useState(false);
    const [current, setCurrent] = useState("");

    const momentDate = (utcDate) => {
        let offset = -1 * new Date().getTimezoneOffset();
        let date = moment.utc(utcDate).utcOffset(offset).format("YYYY-MM-DD");
        return date;
    };

    const momentTime = (utcDate) => {
        let offset = -1 * new Date().getTimezoneOffset();
        let time = moment.utc(utcDate).utcOffset(offset).format("HH:mm");
        return time;
    };

    const onPress = (id) => {
        setCurrent(id);
        setShow(true);
        setMode(id.slice(-4).toLowerCase());
    };

    const onChange = (_, selected) => {
        setShow(false);
        if (selected) {
            setFormData((prevData) => ({
                ...prevData,
                [current]: selected,
            }));
        }
    };

    const submit = () => {
        let { fromDate, fromTime, toDate, toTime } = formData;
        let from = new Date(
            fromDate.getFullYear(),
            fromDate.getMonth(),
            fromDate.getDate(),
            fromTime.getHours(),
            fromTime.getMinutes()
        ).toISOString();
        let to = new Date(
            toDate.getFullYear(),
            toDate.getMonth(),
            toDate.getDate(),
            toTime.getHours(),
            toTime.getMinutes()
        ).toISOString();
        // console.log(from, to);
        getGeodata(token, tracker, from, to);
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View>
                    <Button
                        buttonStyle={styles.dateButton}
                        title={momentDate(formData.fromDate)}
                        type="outline"
                        onPress={() => {
                            onPress("fromDate");
                        }}
                    />
                    <Button
                        buttonStyle={styles.dateButton}
                        title={momentTime(formData.fromTime)}
                        type="outline"
                        onPress={() => {
                            onPress("fromTime");
                        }}
                    />
                </View>
                <View>
                    <Button
                        buttonStyle={styles.dateButton}
                        title={momentDate(formData.toDate)}
                        type="outline"
                        onPress={() => {
                            onPress("toDate");
                        }}
                    />
                    <Button
                        buttonStyle={styles.dateButton}
                        title={momentTime(formData.toTime)}
                        type="outline"
                        onPress={() => {
                            onPress("toTime");
                        }}
                    />
                </View>
            </View>
            <View>
                <Button title="Get Data" onPress={submit} />
            </View>
            {show && (
                <DateTimePicker
                    mode={mode}
                    display="spinner"
                    is24Hour={true}
                    value={formData[current]}
                    onChange={onChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 110,
    },
    form: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "100%",
        width: "100%",
    },
    dateButton: {
        width: 170,
        height: 30,
        marginBottom: 5,
        alignSelf: "stretch",
    },
});

const mapStateToProps = (state) => ({
    token: state.auth.token,
    tracker: state.geodata.activeTrackerId,
});

export default connect(mapStateToProps, { getGeodata })(DatePickerForm);
