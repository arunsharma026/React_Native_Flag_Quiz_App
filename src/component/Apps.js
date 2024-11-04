import { StyleSheet, Text, SafeAreaView, View, Pressable, ImageBackground, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import questionss from "../assets/questions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import bg from "../../img/template0.png"
import { TouchableOpacity } from "react-native";
import Svg from 'react-native-svg';


import { Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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


const data = questionss;
// const datafilter = data.filter(item => item.stage === "m");

const Quiz = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { time } = route.params;


  const [x, setX] = useState(data);

  const [y, setY] = useState([]);

  const [counter, setCounter] = useState(time);

  const [points, setPoints] = useState(0);

  const [index, setIndex] = useState(0);

  const [answerStatus, setAnswerStatus] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);


  const totalQuestions = x.length;

  // const randomNumber = Math.floor(Math.random() * 4);

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

      //       // Push the correct answer with label 'A'
      // questionObject.options.push({
      //   id: `${correctAnswerIndex}`,
      //   options: correctAnswerIndex == 0 ? 'A' : correctAnswerIndex == 1 ? 'B' : correctAnswerIndex == 2 ? 'C' : correctAnswerIndex == 3 ? 'D' :'',
      //   answer: item.answer,
      //   correct: 'correct'
      // });

      // Push 3 random incorrect answers
      for (let i = 0; i < 4; i++) {
        questionObject.options.push({
          id: `${correctAnswerIndex}`,
          options: correctAnswerIndex == 0 ? 'A' : correctAnswerIndex == 1 ? 'B' : correctAnswerIndex == 2 ? 'C' : correctAnswerIndex == 3 ? 'D' : '',
          answer: shuffledOptions[i].answer,
          correct: shuffledOptions[i].answer ? 'incorrect' : 'correct'
        });
      }

      questionObject.options = shuffleArray(questionObject.options);

      return questionObject;
    });

    setY(newY);
  }, [x, index]);




  // useEffect(() => {
  //   // Shuffle the x array
  //   const shuffledX = shuffleArray(x);

  //   // Create the y array in the desired format
  //   const newY = shuffledX.map((item) => {
  //     const questionObject = {
  //       question: item.question,
  //       flag: item.flag,
  //       options: [],
  //       correctAnswerIndex: 0
  //     };

  //     // Shuffle the options for each question
  //     const shuffledOptions = shuffleArray(x.map((xItem) => xItem.answer));

  //     shuffledOptions.forEach((option, optionIndex) => {
  //       const optionObject = {
  //         id: optionIndex.toString(),
  //         options: String.fromCharCode(65 + optionIndex), // A, B, C, D...
  //         answer: option,
  //         correct: item.answer === option ? "correct" : "incorrect"
  //       };

  //       questionObject.options.push(optionObject);

  //       if (item.answer === option) {
  //         questionObject.correctAnswerIndex = optionIndex;
  //       }
  //     });

  //     return questionObject;
  //   });

  //   setY(newY);
  // }, [x]);

  let interval = null;

  const progressPercentage = Math.floor((index / totalQuestions) * 100);

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
        setPoints((points) => points + 10);
        setAnswerStatus(true);
        answers.push({ question: index + 1, answer: true });
      } else {
        setAnswerStatus(false);
        answers.push({ question: index + 1, answer: false });
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
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
    if (index + 1 > x.length) {
      clearTimeout(interval)
      navigation.navigate("Results", {
        answers: answers,
        points: points,
      });
    }
  }, [index]);

  useEffect(() => {
    if (!interval) {
      setCounter(time);
    }
  }, [index]);


  const currentQuestion = y[index];

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

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ position: "relative", width: 40, height: 40 }}>
              <ImageBackground source={require('../../img/wt.png')} style={styles.background}>
                <Pressable   >
                  <Text
                    style={{ color: "black", textAlign: "center", fontSize: 15, fontWeight: "bold" }}
                  >
                    {counter}
                  </Text>
                </Pressable>
              </ImageBackground>
            </View>



            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }} >
                <Text style={{ color: "purple" }}>{index + 1}</Text>/{totalQuestions}
              </Text>
            </View>
          </View>

          <ScrollView style={styles.scrollbox}>

            <View style={styles.quesbox}>
              <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.leanercolor}>
                <Text style={styles.question}>
                  {currentQuestion?.question}
                </Text>
              </LinearGradient>
            </View>

            <View style={styles.quizbox}>
              {currentQuestion?.flag ? <View style={styles.quizimagebx}>
                <Image source={currentQuestion.flag} style={styles.quizimage} />

              </View> : <View style={styles.noimg}></View>}

            </View>

            <View style={{ marginTop: 20 }}>

              {
                currentQuestion?.options?.map((item, index) => (
                  <View style={{ marginVertical: 5 }} >
                    <Pressable
                      onPress={() =>
                        selectedAnswerIndex === null && setSelectedAnswerIndex(index)
                      }
                      key={index}
                    >
                      <LinearGradient

                        colors={selectedAnswerIndex != null && selectedAnswerIndex === index ? ['orange', '#e4b228',] : ['#c71c33', '#e4b228',]}
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
                          elevation: 2
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 2, y: 2 }}  >

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
                              fontWeight: "bold"
                            }}
                          >
                            {item.options}
                          </Text>
                          <Text style={{ marginLeft: 10, color: "#fff" }}> {item.answer} </Text>
                        </View>



                        {
                          answerStatus == null ? null :
                            <View style={{
                              position: "relative", width: 40,
                              height: 40,
                              borderRadius: 20,
                              top: 0,
                              left: 0,
                              left: 0
                            }}>
                              {
                                selectedAnswerIndex != null && selectedAnswerIndex === index ?
                                  <View>{!!answerStatus ? <AntDesign
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
                                  /> : <AntDesign
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
                                  />}</View> : ""
                              }
                            </View>
                        }
                      </LinearGradient>
                    </Pressable>
                  </View>

                ))
              }



            </View>




            {index + 1 >= totalQuestions ? (
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
            )}

          </ScrollView>





        </ImageBackground>


        {/* Progress Bar */}
        {/* <View
                    style={{
                        backgroundColor: "#e9ecef",
                        width: "97%",
                        flexDirection: "row",
                        alignItems: "center",
                        height: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        marginTop: 20,
                        position: "absolute",
                        top: 9,
                        left:5,
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
                            height: 10,
                            right: 0,
                              width: `${progressPercentage}%`,
                            // width: "20%",
                            marginTop: 20,
                        }}
                    />
                </View> */}

      </View>


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
    paddingTop: 16,
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
  },
  quizimagebx: {
    width: "100%",
    height: h / 6,
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
    elevation: 5,
    borderColor: "#fff"
  },
  scrollbox: {
    width: w - 60,
    height: h
  },
  quesbox: {
    marginVertical: 20,
  },
  question: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold"
  },
  leanercolor: {
    padding: 10,
    borderRadius: 10
  }

})
