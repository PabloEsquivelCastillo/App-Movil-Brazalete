import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const Background = () => {
    return (
        <View style={styles.container}>
        {/* Círculo superior */}
        <View style={[styles.circle, styles.topCircle]} />
        {/* Círculo inferior */}
        <View style={[styles.circle, styles.bottomCircle]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flex: 1,
        width: width,
        height: height,
    },
    circle: {
        position: "absolute",
        width: width * 1.4, // Aumenté mucho el tamaño
        height: width * 1.4,
        borderRadius: width * 0.7, // Hace que se vea más como media luna
        backgroundColor: "#66CC99",
        opacity: 0.38,
    },
    topCircle: {
        top: -width * 0.8, // Lo sube más para que parezca media luna
        left: width * 0.5, // Lo mueve más a la derecha
    },
    bottomCircle: {
        bottom: -width * 0.9, // Lo baja más
        right: width * 0.5, // Lo mueve más a la izquierda
    },
});

export default Background;
