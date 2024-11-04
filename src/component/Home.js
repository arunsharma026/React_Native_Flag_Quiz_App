import React from 'react'
import { Text, View, StyleSheet, ScrollView,  TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import logo from "../../img/quizlogo.png";
import bg from "../../img/template.png";
import playbtn from "../../img/playbutonarea.png"
import { useNavigation } from "@react-navigation/native"; 
import { StatusBar } from 'expo-status-bar';


const Home = (props) => {
    const navigation = useNavigation();

    

    return (
        <SafeAreaView style={{ width: "100%",
        height: "100%"}}>
           <StatusBar style="dark" />
        <View style={styles.container}>
       

            <ImageBackground
                source={bg}
                size="100%"
                style={styles.linearbox}
            >
                <View style={styles.topheader}>
                   
            <Image source={logo} style={styles.logo} />
            <Text style={styles.heading}>
                        Quiz App
                    </Text>
                </View>
                <View>

                    {/* <TouchableOpacity style={styles.playbuttton}>
                       
                        <View style={styles.buttontext}>
                        <MaterialIcons name="play-circle-filled" size={40} color="#ffce01" /> 
                           <Text style={{color:"#fff", fontSize:20, fontWeight:"700"}}>Play Quiz 1</Text> 
                        </View>
                        
                    </TouchableOpacity> */}
    <ImageBackground source={playbtn} style={{width:300, height:230, resizeMode:"cover",justifyContent: "center", alignItems: "center",}}>
                    <TouchableOpacity style={styles.playbuttton2}  onPress={() => navigation.navigate("Stage")}>
                    <View  style={styles.buttontext} > 
                         
                        <MaterialIcons name="play-circle-filled" size={40} color="#fff" style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
        textShadowOffset: { width: 1, height: 2 }, // Shadow offset (x, y)
        textShadowRadius: 10,}} /> 
                        <Text style={{color:"#fff", fontSize:20, fontWeight:"700", marginLeft:10,  textShadowColor: 'rgba(0, 0, 0, 0.75)', // Shadow color
        textShadowOffset: { width: 1, height: 2 }, // Shadow offset (x, y)
        textShadowRadius: 7,}}>Play Quiz </Text> 
                        
                        </View>
                    </TouchableOpacity>
                    </ImageBackground>

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
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    topheader:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:20
    },
    logo:{
        width:300,
        height:200,
        marginTop:40,
        resizeMode:'contain'
    },
    heading: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        textShadowColor: 'rgba(0, 0, 0, 0.57)', // Shadow color
        textShadowOffset: { width: 1, height: 2 }, // Shadow offset (x, y)
        textShadowRadius: 7,
        marginBottom:10
    },
    playbuttton: {
        backgroundColor: "#fff",
        width: "100%",
        flexDirection: "column",
        marginVertical: 20,   
        paddingVertical:20, 
        borderRadius:90,
        // backgroundColor:"#f3632a",
        // elevation:9
    },
    playbuttton2: { 
        width: 200,
        flexDirection: "column", 
        alignItems: "center",
        paddingVertical:10, 
        marginTop:25,
        borderRadius:90,
        // backgroundColor:"#f25833", 
    },
    buttontext:{
fontSize:23,
color:"#fff", 
flexDirection:"column", 
alignItems:"center",
justifyContent:"space-between",  
    }

});

export default Home
