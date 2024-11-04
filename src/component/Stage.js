import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated, Image, ImageBackground, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import quizlogo from "../../img/quiz-icon.png"
import { Dimensions } from 'react-native';
import bg from "../../img/template0.png"
import btn from "../../img/btn.png"
import { StatusBar } from 'expo-status-bar';


const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const bw = w / 2 - 40;
const ht = h / 4 - 50;

const Stage = () => {

    const navigation = useNavigation();


    return (
        <SafeAreaView style={{ width: w, height: h }}>
            <StatusBar style="dark" />
        <View style={styles.container}>

            <ImageBackground
                source={bg}
                size="100%"
                style={styles.linearbox}
            >

                <View style={{ flexDirection: "row", columnGap: 10 }}>



                    <View  >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={30} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.headingtop}>Choose your <Text style={styles.headingtopspan}>mode</Text></Text>
                    </View>
                </View>


                <View style={{ flex: 0.5, width: "100%", height: "90%", flexDirection: "column", justifyContent: "flex-start" }}>

                    <View style={{ alignItems: "center" }}>
                        <Image source={quizlogo} style={styles.logo} />

                    </View>

                    <View style={styles.contentbox}>
                        <View style={{ columnGap: bw / 4, marginBottom: 10, justifyContent: "center", flexDirection: "row", width: "100%" }}>

                            <TouchableOpacity style={{ width: 150, height: 150, flexDirection: "column", }}
                                onPress={() => navigation.navigate("Level", { index: 0, levels : "e" })}
                            >
                                <View style={{height: 150}} >
                                    <Image source={btn}
                                        style={styles.backgroundImage} />


                                    <Text style={styles.boxtexteasy}>
                                        Easy
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: 150, marginTop: 40, height: 150, flexDirection: "column", justifyContent: "center" }} onPress={() => navigation.navigate("Level", { index: 1, levels : "m" })}>
                                <View style={{height: 150}}>
                                    <Image source={btn}
                                        style={styles.backgroundImage} />
                                    <Text style={styles.boxtextmedium}>
                                        Medium
                                    </Text>

                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={{ columnGap: bw / 3, justifyContent: "center", flexDirection: "row", width: "100%",}}>

                            <TouchableOpacity style={{ width: 150, height: 150, marginTop: -30, flexDirection: "column", }} onPress={() => navigation.navigate("Level", { index: 2, levels : "h" })}>
                                <View style={{height: 150}}>
                                    <Image source={btn}
                                        style={styles.backgroundImage} />

                                    <Text style={styles.boxtexthard}>
                                        Hard
                                    </Text>
                                    {/* <Text style={styles.boxtextbottom}>
                                    Play fast and learn
                                </Text> */}

                                </View>
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={{ width: 150, marginTop: 40, marginTop: -10, height: 150, flexDirection: "column", justifyContent: "center" }} onPress={() => navigation.navigate("Quiz", { time: 5 })}>
                                <View >
                                    <Image source={btn}
                                        style={styles.backgroundImage} />
                                    <Text style={styles.boxtextpro}>
                                        Pro
                                    </Text>
                                     

                                </View>
                            </TouchableOpacity> */}

                        </View>

                    </View>

                </View>

            </ImageBackground>

        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignContent: "center",

    },
    linearbox: {
        flex: 1,
        height: "120%",
        paddingTop:30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: "90%",
        height: "90%",
        minHeight:h/4,
        resizeMode: 'contain',
        marginTop: 10
    },
    contentbox: {
        width: "100%",
        height: "auto",
        marginTop: 10,
        paddingHorizontal: 20
    },
    headingtop: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold"
    },
    headingtopspan: {
        color: "#000"
    },
    boxtexteasy: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        top: 15,
        position: "absolute",
        left: "38%"
    },
    boxtextmedium: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        top: 14,
        position: "absolute",
        left: "27%"
    },
    boxtexthard: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        top: 15,
        position: "absolute",
        left: "37%"
    },
    boxtextpro: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        top: 15,
        position: "absolute",
        left: "40%"
    },
    boxtextbottom: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10
    },
    backgroundImage: {
        width: "auto",
        height: "90%",
        resizeMode: "stretch",
        borderRadius: 12,
    },
}
)

export default Stage
