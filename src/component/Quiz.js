import { StyleSheet, Text, SafeAreaView, View, Pressable, ImageBackground, Image, ScrollView, NativeModules , NativeEventEmitter } from "react-native";
import React, { useState, useEffect } from "react";
import questionss from "../assets/questions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import bg from "../../img/template0.png"
import { TouchableOpacity } from "react-native";
import win from "../../img/cr.gif"
import { Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import clapimg from '../../img/clap.gif';
import cry from '../../img/cry.gif';
import sound from '../../img/sound.png';
import nosound from '../../img/nosound.png';
import pointsbg from '../../img/points.png';
import bgcry from "../../img/bgw.png";
import '@expo/match-media';
import { useMediaQuery } from "react-responsive";
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

 

const playSound = async () => {

  const soundObject = new Audio.Sound();

  try {
    await soundObject.loadAsync(require('../../assets/clapping.wav'));
    await soundObject.playAsync();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
    await soundObject.pauseAsync();
    await soundObject.unloadAsync();
  } catch (error) {
    console.error('Error playing audio:', error);
  }
  
};
const playSoundcry = async () => {

  const soundObject = new Audio.Sound();

  try {
    await soundObject.loadAsync(require('../../assets/crying.wav'));
    await soundObject.playAsync();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
    await soundObject.pauseAsync();
    await soundObject.unloadAsync();
  } catch (error) {
    console.error('Error playing audio:', error);
  }
  
};
const Quiz = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { time } = route.params;
  const { levels } = route.params;
  const { qs } = route.params;
 
 

  const data = questionss;

  const datafilter = data?.filter(item => item.stage == levels);


  const [x, setX] = useState(datafilter);

  const [y, setY] = useState([]);  
  const [isMuted, setIsMuted] = useState(false);

  const [counter, setCounter] = useState(time);

  const [points, setPoints] = useState(0);

  const [index, setIndex] = useState(0);

  const [answerStatus, setAnswerStatus] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const initialWidth = 100;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(initialWidth);


  let interval = null;
  // const totalQuestions = x.length; 


  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 767,
    query: "(max-device-width: 767px)"
  }); 

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prevElapsedSeconds) => prevElapsedSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  useEffect(() => {
    const remainingTime = time - counter;
    const newProgressBarWidth = (remainingTime / time) * initialWidth;
    setProgressBarWidth(newProgressBarWidth);
  }, [elapsedSeconds, time]);

  useEffect(() => {
    // Shuffle the x array
    const shuffledX = shuffleArray(x);

    const correctAnswerIndex = Math.floor(Math.random() * 4);

    // Create the y array in the desired format
    const newY = shuffledX.map((item) => {
      const questionObject = {
        question: item.question,
        flag: item.flag,
        options: [],
        correctAnswerIndex: correctAnswerIndex
      };



      // Shuffle the options for each question
      const shuffledOptions = shuffleArray(shuffledX.filter((xItem) => xItem.answer !== item.answer)); // Exclude the correct answer


      const options = ['A', 'B', 'C', 'D'];

      questionObject.options.push({
        id: '0',
        options: options[0], // 'A'
        answer: item.answer,
        correct: 'correct'
      });

      // Push 3 random incorrect answers with options B, C, and D
      for (let i = 0; i < 3; i++) {
        questionObject.options.push({
          id: (i + 1).toString(),
          options: options[i + 1], // 'B', 'C', 'D' in sequence
          answer: shuffledOptions[i].answer,
          correct: 'incorrect'
        });
      }


      questionObject.options = shuffleArray(questionObject.options);

      return questionObject;
    });

    setY(newY);
  }, [x, index]);
 
  const [trues, setTrues] = useState(false);
  const [clap, setClap] = useState('');

const ply = ()=>{
  if(isMuted){

  } else{
    trues == true ? playSound() : playSoundcry()
  }
  
}


  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      // if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
      if (trues == true) {
        // isMuted ? "" : playSound();
        ply();
        setPoints((points) => points + 10);
        setClap('ok');
        setAnswerStatus(true);
        answers.push({ question: index + 1, answer: true }); 
        setTimeout(() => {
          setIndex(index + 1);
          setClap('');
        }, 2000)
      } else {
        // isMuted ? "" : playSoundcry();
        ply();
        setAnswerStatus(false);
        answers.push({ question: index + 1, answer: false });
        setClap('wrong');
        setTimeout(() => {
          setIndex(index + 1);
          setClap('');
        }, 1500)
      }
    }


  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
    setTrues(false);
    setCounter(time)
  }, [index]);

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter((state) => state - 1);
      }
      if (counter === 0) {
        setIndex(index + 1);
        setCounter(time);
      }
    };

    interval = setTimeout(myInterval, 1000);


    // clean up
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  useEffect(() => {
    // const tr = index + 1  >  currentQuestion1.length;
    if (index + 1 == currentQuestion1.length) {
      clearTimeout(interval)
      navigation.navigate("Results", {
        totalqs: qs,
        answers: answers,
        points: points,
      });
    }

  }, [index]);





  const currentQuestion1 = y?.slice(0, qs);

  const currentQuestion = currentQuestion1[index];


  return (
    <SafeAreaView style={{
      width: "100%",
      height: "100%",
    }}>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <ImageBackground
          source={bg}
          size="100%"
          style={styles.linearbox} >

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {/* <View style={{ position: "relative", width: 40, height: 40 }}>
              <ImageBackground source={require('../../img/wt.png')} style={styles.background}>
                <Pressable   >
                  <Text
                    style={{ color: "black", textAlign: "center", fontSize: 15, fontWeight: "bold" }}
                  >
                    {counter}
                  </Text>
                </Pressable>
              </ImageBackground>
            </View> */}

            <View>
              <ImageBackground source={pointsbg} style={styles.pointsbg}>
                <Text style={styles.pointstext}>
                  {points}
                </Text>
              </ImageBackground>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <TouchableOpacity onPress={ ()=>setIsMuted(!isMuted)}>
                {isMuted ?  
         <Image source={nosound} style={{width:35, height:35}} />
          :  
          <Image source={sound} style={{width:35, height:35}} />
         }

                </TouchableOpacity>
              </View>

              {/* <Text style={{ fontSize: 20 }} >
                <Text style={{ color: "purple" }}>{index + 1}</Text>/{currentQuestion1.length}
              </Text> */}
            </View>
          </View>

          <ScrollView style={styles.scrollbox}>

            <View style={styles.quesbox}>
              <View style={styles.qno}>
                <Text style={styles.qnotext}>{index + 1}</Text>
              </View>

              {isTabletOrMobileDevice == true ? <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.leanercolor}><Text style={styles.question}> {currentQuestion?.question}</Text> 
              </LinearGradient>
                : <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.leanercolorlg}> 
                <Text style={styles.questionlg}> {currentQuestion?.question}</Text>
                </LinearGradient>
              }

             


            </View>

            <View style={styles.quizbox}>
              {isTabletOrMobileDevice == true ? currentQuestion?.flag ? <View style={styles.quizimagebx}>
                <Image source={currentQuestion.flag} style={styles.quizimage} />

              </View> : <View style={styles.noimg}></View> : currentQuestion?.flag ? <View  >
                <Image source={currentQuestion.flag} style={styles.quizimagelg} />

              </View> : <View style={styles.noimg}></View>}

            </View>

            {
              isTabletOrMobileDevice == true ? <View style={{ marginTop: 20 }}>
                {currentQuestion?.options?.map((item, index) => (
                  <View style={{ marginVertical: 5 }} key={index}>
                    <Pressable
                      onPress={() => {
                        if (selectedAnswerIndex === null) {
                          setSelectedAnswerIndex(index);
                          setTrues(item.correct === "correct");
                        }
                      }}
                    >
                      <LinearGradient
                        colors={
                          selectedAnswerIndex !== null && selectedAnswerIndex === index
                            ? ["orange", "#e4b228"]
                            : ["#c71c33", "#e4b228"]
                        }
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          borderWidth: 0.5,
                          padding: 8,
                          borderBottomWidth: 6,
                          justifyContent: "space-between",
                          borderBottomColor: "#b21328",
                          marginVertical: 2,
                          borderRadius: 20,
                          elevation: 2,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 2, y: 2 }}
                      >
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width:'100%', }}>
                          <Text
                            style={{
                              borderColor: "#fff",
                              position: "relative",
                              backgroundColor: "#e26071",
                              textAlign: "center",
                              borderWidth: 0.5,
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                              padding: 10,
                              color: "#fff",
                              fontWeight: "bold",
                            }}
                          >
                            {/* {item.options} */}
                            {index == 0 ? "A" : index == 1 ? 'B' : index == 2 ? 'C' : "D"}
                          </Text>
                          <Text style={{ marginLeft: 10, color: "#fff", flexWrap:"wrap", width:'70%' }}>  {item.answer}  </Text>
                            {answerStatus === null ? null : (
                          <View
                            style={{
                              position: "relative",
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                              top: 0,
                              left: 0,
                              left: 0,
                            }}
                          >
                            {selectedAnswerIndex !== null && selectedAnswerIndex === index ? (
                              <View>
                                {!!answerStatus && item.correct === "correct" && trues === true ? (
                                  <AntDesign
                                    style={{
                                      backgroundColor: "green",
                                      textAlign: "center",
                                      width: 40,
                                      height: 40,
                                      borderRadius: 20,
                                      padding: 10,
                                    }}
                                    name="check"
                                    size={20}
                                    color="white"
                                  />
                                ) : (
                                  <AntDesign
                                    style={{
                                      backgroundColor: "red",
                                      textAlign: "center",
                                      width: 40,
                                      height: 40,
                                      borderRadius: 20,
                                      padding: 10,
                                    }}
                                    name="closecircle"
                                    size={20}
                                    color="white"
                                  />
                                )}
                              </View>
                            ) : (
                              ""
                            )}
                          </View>
                        )}
                        </View>
                       
                      </LinearGradient>
                    </Pressable>
                  </View>
                ))}
              </View> : <View style={{   marginTop: 20,  alignItems: 'center',  
               flexDirection: 'row', 
               justifyContent: 'space-between',
                rowGap: 10, 
                flexWrap: "wrap"
              }}>
                {currentQuestion?.options?.map((item, index) => (

                  <View style={{ marginVertical: 5, }} key={index}>
                    <Pressable
                      onPress={() => {
                        if (selectedAnswerIndex === null) {
                          setSelectedAnswerIndex(index);
                          setTrues(item.correct === "correct");
                        }
                      }}
                      style={{ width: w / 2 - 45 }}
                    >
                      <LinearGradient
                        colors={
                          selectedAnswerIndex !== null && selectedAnswerIndex === index
                            ? ["orange", "#e4b228"]
                            : ["#c71c33", "#e4b228"]
                        }
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          borderWidth: 0.5,
                          padding: 8,
                          borderBottomWidth: 6,
                          justifyContent: "space-between",
                          borderBottomColor: "#b21328",
                          marginVertical: 2,
                          borderRadius: 20,
                          elevation: 2,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 2, y: 2 }}
                      >
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          <Text
                            style={{
                              borderColor: "#fff",
                              position: "relative",
                              backgroundColor: "#e26071",
                              textAlign: "center",
                              borderWidth: 0.5,
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                              padding: 10,
                              color: "#fff",
                              fontWeight: "bold",
                            }}
                          >
                            {/* {item.options} */}
                            {index == 0 ? "A" : index == 1 ? 'B' : index == 2 ? 'C' : "D"}
                          </Text>
                          <Text style={{ marginLeft: 10, color: "#fff" }}>{item.answer}</Text>
                        </View>
                        {answerStatus === null ? null : (
                          <View
                            style={{
                              position: "relative",
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                              top: 0,
                              left: 0,
                              left: 0,
                            }}
                          >
                            {selectedAnswerIndex !== null && selectedAnswerIndex === index ? (
                              <View>
                                {!!answerStatus && item.correct === "correct" && trues === true ? (
                                  <AntDesign
                                    style={{
                                      backgroundColor: "green",
                                      textAlign: "center",
                                      width: 40,
                                      height: 40,
                                      borderRadius: 20,
                                      padding: 10,
                                    }}
                                    name="check"
                                    size={20}
                                    color="white"
                                  />
                                ) : (
                                  <AntDesign
                                    style={{
                                      backgroundColor: "red",
                                      textAlign: "center",
                                      width: 40,
                                      height: 40,
                                      borderRadius: 20,
                                      padding: 10,
                                    }}
                                    name="closecircle"
                                    size={20}
                                    color="white"
                                  />
                                )}
                              </View>
                            ) : (
                              ""
                            )}
                          </View>
                        )}
                      </LinearGradient>
                    </Pressable>
                  </View>

                ))}
              </View>
            }







            {/* {index + 1 >= totalQuestions ? (
              <Pressable
                onPress={() =>
                  navigation.navigate("Results", {
                    points: points,

                    answers: answers,
                  })
                }
                style={{
                  backgroundColor: "green",
                  padding: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: 6,
                  marginTop: 20
                }}
              >
                <Text style={{ color: "white" }}>Done</Text>
              </Pressable>
            ) : answerStatus === null ? null : (
              <Pressable
                onPress={() => setIndex(index + 1)}
                style={{
                  backgroundColor: "green",
                  padding: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: 6,
                  marginTop: 20
                }}
              >
                <Text style={{ color: "white" }}>Next Question</Text>
              </Pressable>
            )} */}

          </ScrollView>


        </ImageBackground>


        {/* Progress Bar */}
        <View
          style={{
            backgroundColor: "#e9ecef",
            width: "97%",
            flexDirection: "row",
            alignItems: "center",
            height: 15,
            borderRadius: 20,
            justifyContent: "center",
            marginTop: 20,
            position: "absolute",
            bottom: 0,
            left: 5,
            elevation: 8,
            borderWidth: 1,
            borderColor: "#eac190"
          }}
        >
          <LinearGradient colors={['#c82090', '#6a14d1',]}
            style={{
              borderRadius: 12,
              position: "absolute",
              left: 0,
              height: 15,
              right: 0,
              width: `${100 - progressBarWidth}%`,
              // width: "20%", 
              bottom: 0
            }}
          />
        </View>

      </View>

      {clap === 'ok' ? <View style={styles.claps}>
        <ImageBackground source={win} style={{ width: "100%", height: "100%" }}>
          <Image source={clapimg} style={styles.clapsimg}></Image>
        </ImageBackground>
      </View>
        : clap === 'wrong' ? <View style={styles.claps}>
          <ImageBackground source={bgcry} style={{ width: "100%", height: "100%" }}>
            <Image source={cry} style={styles.clapsimgno}></Image>
          </ImageBackground>
        </View>
          : ""
      }

    </SafeAreaView>
  );
};

export default Quiz;

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
    paddingHorizontal: 30,
    paddingTop: 28,
    paddingBottom: 15
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 40,
    height: 40,
    alignItems: "center"
  },
  quizbox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  quizimagebx: {
    width: 300,
    borderWidth: 4,
    borderColor: "#eee",
    height: 200,
    backgroundColor: "#eee",
    borderRadius: 4

  },
  quizimagebxlg: {
    width: w / 3,
    borderWidth: 4,
    borderColor: "#eee",
    height: w / 2,
    backgroundColor: "#eee",
    borderRadius: 4
  },
  noimg: {
    width: "100%",
    height: h / 6,
  },
  quizimage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 12,
    overflow: "hidden",
    // elevation: 5,
    borderColor: "#fff"
  },
  quizimagelg: {
    width: w / 3 - 5,
    height: w / 4,
    resizeMode: "contain",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    // elevation: 5,
    borderColor: "#fff",
    borderWidth: 15
  },
  scrollbox: {
    width: w - 60,
    height: h
  },
  quesbox: {
    marginVertical: 20,
    flexDirection: "row",
    columnGap: 4
  },
  qno: {
    padding: 10, borderRadius: 10, backgroundColor: "#ADD8E6", paddingHorizontal: 16, justifyContent: "center"
  },
  qnotext: {
    fontSize: 20, fontWeight: "bold"
  },
  question: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    flexWrap: "wrap"
  },
  questionlg: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    flexWrap: "wrap"
  },
  leanercolor: {
    padding: 10,
    width: "80%",
    borderRadius: 10
  },
  leanercolorlg:{
    padding: 10,
    width: "97.3%",
    borderRadius: 10
  },
  claps: {
    position: "absolute",
    backgroundColor: "#07050578",
    top: 0,
    height: h,
    width: w,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    flexDirection: "row"
  },
  clapsimg: {
    width: 100,
    height: 100,
    top: "40%",
    left: "39%",
  },
  clapsimgno: {
    width: 100,
    height: 120,
    resizeMode: "contain",
    top: "46%",
    left: "39%",
  },
  pointsbg: {
    width: 160,
    height: 51,
    resizeMode: "cover",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  pointstext: {
    color: "#fff",
    marginTop: -2,
    fontSize: 13,
    fontWeight: "bold"

  }

})
