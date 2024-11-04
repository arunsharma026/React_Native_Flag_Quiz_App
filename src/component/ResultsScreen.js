import { StyleSheet, Text, SafeAreaView, View, Pressable, ImageBackground, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react"; 
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native"; 
import { LinearGradient } from 'expo-linear-gradient'; 
import { TouchableOpacity } from "react-native";
import { Dimensions, BackHandler } from 'react-native';
 

import win from "../../img/cr.gif" 

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const ResultsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

   const  data= route.params 
    const totalsawal = data.answers.length;
     const totalSahi = data.answers.filter(answer => answer.answer === true).length;
     const totalWrong = data.answers.filter(answer => answer.answer === false).length;
    const totalPoints = data.points; 

    return (
        <SafeAreaView style={{ width: w, height: h }}>
            <View style={styles.container}>
                <LinearGradient
                    // colors={['#ffce01', '#f5a338', '#c5690f']} 
                    colors={['#f6f6f6', '#f6f6f6']}
                    style={styles.linearbox}
                >

                    <Image source={win} style={{width:w, height:h/2}} />

                    <View style={styles.viewbx}>

                        <View style={styles.winbox}>
                            <View style={styles.circle}>
                                <View style={styles.circle2}><Text style={{ fontWeight: "bold", color: "#fff", fontSize: 30 }}>{totalPoints}</Text></View>
                            </View>

                            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 26 }}>{totalPoints > 30 ? "Congrats!!" : "Ohhh!"}</Text>
                            <Text style={{ color: "#4fc00c", fontWeight: "bold", fontSize: 32, marginTop: 10 }}>{totalPoints} Score</Text>
                            <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 10 }}>Quiz completed successfully.</Text>
                            <Text style={{ color: "#999", fontWeight: "500", fontSize: 16, marginTop: 10, textAlign: "center", lineHeight: 22 }}>
                                You attempt <Text style={{ color: "blue" }}>{totalsawal} questions</Text> and from that <Text style={{ color: "#4fc00c" }}> {totalSahi} answer</Text> is correct and {totalWrong} Wrong.
                            </Text>

                            <TouchableOpacity>
                                <Text style={styles.homebtn} onPress={() => navigation.navigate("Home")}>Go Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </LinearGradient>




            </View>


        </SafeAreaView>
    );
};

export default ResultsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignContent: "flex-start",
        position: "relative",
        justifyContent: "center"

    },
    linearbox: {
        height: "100%",
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    winbox: {
        width: "90%",
        backgroundColor: "#fff",
        height: "auto",
        padding: 20,
        margin: "auto",
        borderRadius: 20,
        paddingBottom:40,
        elevation: 4,
        alignItems: "center"
    },

    viewbx: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 10,
        padding: 10,
        position: "absolute",
        bottom: 140,
        width: w
    },

    circle: {
        width: 140,
        height: 140,
        backgroundColor: "#bd6ada",
        borderRadius: 200,
        padding: 20,
        alignItems: "center",
        marginTop: -90
    },
    circle2: {
        width: 100,
        height: 100,
        backgroundColor: "#bd6ada",
        borderWidth: 20,
        justifyContent: "center",
        borderColor: "#ead3f5",
        borderRadius: 130,
        padding: 10,
        alignItems: "center"
    },
    homebtn:{
        backgroundColor:"#c82090",
        borderWidth:3,
        borderColor:"#dc1b9b",
        paddingHorizontal:40,
        paddingVertical:15,
        borderRadius:30,
        marginTop:30,
        color:"#fff",
        elevation:3
    }

})