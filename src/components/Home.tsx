import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    Callout,
    Polyline,
} from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";
import { connect } from "react-redux";
import { getGeodata } from "../actions/geodata";
import DatePickerForm from "./DatePickerForm";

const moment = require("moment");

function Home({ geodata: { loading, data }, token, user, getGeodata }) {
    useEffect(() => {
        if (user.authorizedTrackers) {
            getGeodata(token, user.authorizedTrackers[0].id);
        }
    }, []);

    useEffect(() => {
        if (data) {
            mapRef.current.fitToElements(true);
        }
    }, [data])

    const mapRef: any = useRef(null);

    const localDate = (utcDate: string) => {
        let offset = -1 * new Date().getTimezoneOffset();
        let date = moment
            .utc(utcDate)
            .utcOffset(offset)
            .format("YYYY-MM-DD HH:mm:ss");
        return date;
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                region={{
                    latitude: 55.75,
                    longitude: 37.61,
                    latitudeDelta: 1.0,
                    longitudeDelta: 1.0,
                }}
            >
                {data &&
                    data.map((marker) => {
                        let location = marker.location.split(", ");
                        let coords = {
                            latitude: +location[0],
                            longitude: +location[1],
                        };
                        return (
                            <Marker
                                coordinate={coords}
                                key={marker._id}
                            >
                                <Callout>
                                    <View>
                                        <Text>Time: {localDate(marker.time)}</Text>
                                        <Text>Location: {marker.location}</Text>
                                    </View>
                                </Callout>
                            </Marker>
                        );
                    })}

                {data && (
                    <Polyline
                        coordinates={data.map((point) => {
                            let location = point.location.split(", ");
                            return {
                                latitude: +location[0],
                                longitude: +location[1],
                            };
                        })}
                        strokeColor="#ffb300"
                        strokeWidth={6}
                    />
                )}
            </MapView>
            <View style={styles.controls}>
                {loading ? (
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                ) : (
                    <View style={styles.controlsData}>
                        {data && (
                            <Text>
                                From {data.length && localDate(data[0].time)} to{" "}
                                {data.length &&
                                    localDate(data[data.length - 1].time)}
                            </Text>
                        )}
                        <DatePickerForm />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    map: {
        width: "100%",
        height: "75%",
    },
    controls: {
        width: "100%",
        height: "25%",
        borderTopColor: "gray",
        borderTopWidth: 1,
    },
    loading: {
        height: "100%",
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    controlsData: {
        height: "100%",
        padding: 10,
    },
});

const mapStateToProps = (state) => ({
    geodata: state.geodata,
    token: state.auth.token,
    user: state.auth.user,
});

export default connect(mapStateToProps, { getGeodata })(Home);
