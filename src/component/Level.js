import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Modal, TouchableOpacity, Image, ImageBackground, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native"; 
import { Dimensions } from 'react-native';
import bgs from "../../img/bgs.png"
import playbtn from "../../img/playbtn.png"
import { StatusBar } from 'expo-status-bar'; 
import l1 from "../../img/l1.png";
import l2 from "../../img/l2.png";
import l3 from "../../img/l3.png";
import l4 from "../../img/l4.png";
import setting from "./Setting"

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const bw = w / 2 - 40;
const ht = h / 4 - 50;

const settingdata = setting;

const Level = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const route = useRoute();
    const {index, levels} = route.params;

    const datasetting = settingdata[index]

    const [lvl, setlvl] = useState('');
    const [time, settime] = useState();
    const [qs, setqs] = useState('')

    const toggleModal = async(t, l, qs) => {
        setModalVisible(!modalVisible);
        settime(t)
        setlvl(l)
        setqs(qs)
      };

      const toggleModalclose = async () =>{
        setModalVisible(!modalVisible);
        settime('')
        setlvl('')
        setqs(qs)
      }
     

      const startQuiz = (t) => {
        toggleModal(); // Close the modal
        navigation.navigate('Quiz', { time: time, levels: levels, qs: qs  }); // Navigate to the "Quiz" page
    
      };

    

    return (
        <SafeAreaView style={{ width: w, height: h }}>
            <StatusBar style="dark" />
            <View style={styles.container}>

                <ImageBackground
                    source={bgs}
                    size="100%"
                    style={styles.linearbox}
                >

                    <View style={{ flexDirection: "row", columnGap: 10 }}>



                        <View>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name="arrow-back" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.headingtop}>Choose your <Text style={styles.headingtopspan}>Level</Text></Text>
                        </View>
                    </View>

        <View style={styles.viewstagebx}>
            <View style={styles.viewstage}>
                <TouchableOpacity onPress={()=>toggleModal(30, 1, 24)}>
                    <Image source={l1} style={styles.stageimg}>

                    </Image>
                </TouchableOpacity >
                <TouchableOpacity onPress={()=>toggleModal(20, 2, 34)}>
                    <Image source={l2} style={styles.stageimg}>

                    </Image>
                </TouchableOpacity> 
            </View>
            <View style={styles.viewstage}>
                <TouchableOpacity onPress={()=>toggleModal(15, 3, 44)}>
                    <Image source={l3} style={styles.stageimg}>

                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>toggleModal(5, 4, 54)}>
                    <Image source={l4} style={styles.stageimg}>

                    </Image>
                </TouchableOpacity> 
            </View>
        </View>


                </ImageBackground>

            </View>

            {/* Modal */}
      <Modal
        animationType="fade"  
        transparent={true}      
        visible={modalVisible}  
      >
        <View style={styles.modalContainer}>
          {/* Modal content */}
          <View style={styles.modalContent}>
           
           <View style={styles.innermodal}>
            
        <View style={styles.quizbx}>
        <View style={styles.quizbxinn}>
                <Text style={styles.textbold}>Game Name :</Text><Text style={styles.textnormal}>{datasetting?.gamename}</Text>
            </View>
            <View style={styles.quizbxinn}>
                <Text style={styles.textbold}>Stage :</Text><Text style={styles.textnormal}>{datasetting?.stage}</Text>
            </View>
            <View style={styles.quizbxinn}>
                <Text style={styles.textbold}>Level :</Text><Text style={styles.textnormal}>{lvl}</Text>
            </View>
            <View style={styles.quizbxinn}>
                <Text style={styles.textbold}>Total Qustions :</Text><Text style={styles.textnormal}>{qs}</Text>
            </View>
            <View style={styles.quizbxinn}>
                <Text style={styles.textbold}>Time :</Text><Text style={styles.textnormal}>{time} s/q</Text>
            </View>
        </View>

           </View>

           <TouchableOpacity 
        //    onPress={(props) => navigation.navigate("Quiz", { time: 15, level : "e" })}
           onPress={startQuiz}
           >
            <Image source={playbtn} style={styles.playebtn}   />
           </TouchableOpacity>

            {/* Close button */}
            <TouchableOpacity onPress={toggleModalclose} style={styles.closebx}>
              <Icon name="close" size={20} color="#fff" style={{color:"#fff", marginLeft:2}} /> 
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
        </SafeAreaView>
    )
}

export default Level

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignContent: "center",
        justifyContent: "center"

    },
    linearbox: {
        flex: 1,
        height: "115%",
        paddingTop: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    }, 
    contentbox: {
        width: "100%",
        height: "auto",
        marginTop: 20,
        paddingHorizontal: 20
    },
    headingtop: {
        fontSize: 24,
        color: "#000",
        fontWeight: "bold"
    },
    headingtopspan: {
        color: "#000"
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
    backgroundImage: {
        width: "auto",
        height: "90%",
        resizeMode: "stretch",
        borderRadius: 12,
    },
    viewstagebx:{ 
         padding:20, 
    },
    viewstage:{
      width:"100%",
      flexDirection:"row", 
      columnGap:40,
      marginTop:-20,
      justifyContent: 'center',
    },
    stageimg:{
        width:100,
        height:300,
        resizeMode:"contain"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
      },
      modalContent: {
        width: '80%',
        maxWidth:600,
        backgroundColor: "#b35f23",
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      closebx:{
        width:23,
        height:23,
        backgroundColor:"#b35f23",
        borderRadius:23,
        position:"absolute",
        right:-10,
        justifyContent:"center",
        alignContent:"center",
        top:-10
      },
      innermodal:{
        backgroundColor:"#f3b76a",
        borderWidth:8,
        borderBlockColor:'#802716',
        width:"100%",
        height:400,
        alignItems:"center",
        justifyContent:"center"

      },
      playebtn:{
        width:160,
        height:90,
        resizeMode:"contain",
        marginVertical:15, 
      },
      quizbx:{
        width:"100%",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        rowGap:20
      },
      quizbxinn:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
      },
      textbold:{
        fontWeight:"bold",
        fontSize:17
      },
      textnormal:{
        fontWeight:"500",
        fontSize:17,
        color:"#c14322",
        marginLeft:10
      }
}
)
