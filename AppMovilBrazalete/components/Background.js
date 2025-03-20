import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const Background = () => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {/* Círculo superior */}
                <View style={[styles.circle, styles.topCircle]} />
                {/* Círculo inferior */}
                <View style={[styles.circle, styles.bottomCircle]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: width,
        height: height,
        backgroundColor: '#fff',
    },
    innerContainer: {
        flex: 1,
        overflow: "hidden", // Evita que los círculos sobresalgan
    },
    circle: {
        position: "absolute",
        width: width * 1.4,
        height: width * 1.4,
        borderRadius: width * 0.7,
        backgroundColor: "#91E7BC",
        opacity: 0.38,
    },
    topCircle: {
        top: -width * 0.8,
        left: width * 0.5,
    },
    bottomCircle: {
        bottom: -width * 0.6,
        right: width * 0.5,
    },
});

export default Background;
