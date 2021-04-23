import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Greeting = props => {
    const [currentStep, setCurrentStep] = useState('intor');
    const [gameCode, setGameCode] = useState('');
    const [gameDocID, setGameDocID] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');


    const createGame = () => {
        generateGameCode()
          .then(response => {
            if (!response.hasError) {
              setGameDocID(response);
              setCurrentStep('get-name');
            } else {
              let friendlyError = { friendly: "Something has gone terribly wrong.", technical: response.value !== undefined ? response.value.toString() : '' };
              setError(() => { throw friendlyError });
            }
          })
          .catch(err => {
            let friendlyError = { friendly: "Something has gone terribly wrong.", technical: err.toString() };
            setError(() => { throw friendlyError });
          });
      };

    const updateName = () => {
        if (userName.length > 0) {
          return auth().currentUser.updateProfile({
            displayName: userName,
          })
          .then(r => {
            props.joinGame(gameDocID);
          })
          .catch(err => {
            let friendlyError = { friendly: "Something has gone terribly wrong.", technical: err.toString() };
            setError(() => { throw friendlyError });
          });
        }
      };

    const joinGame = () => {
         if (gameCode.length === 4) {
          return firestore()
            .collection("TicTacToe-game")
            .where("gameCode", "==", gameCode.toUpperCase())
            .get()
            .then(results => {
              if (results.size > 0) {
                let thisGameDocID = null;
                results.forEach(game => {
                  thisGameDocID = game.id;
                });
                setGameDocID(thisGameDocID);
                setCurrentStep('get-name');
              } else {
                setCurrentStep('error-game-not-found');
              }
            })
            .catch(err => {
              let friendlyError = { friendly: "Something has gone terribly wrong.", technical: err.toString() };
              setError(() => { throw friendlyError });
            });
        }
      };

      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={props.styles.TicTacToeGameContainer}>
            <View style={props.styles.TicTacToeGameInnerContainer}>
              <Image style={props.styles.TicTacToeGreetingsImage} source={require('https://www.figma.com/file/qI5UoqjqWTt4C9Y9Pe8GMc/Untitled?node-id=22%3A7')} resizeMode={"cover"} />
              <View style={props.styles.TicTacToeGameBar}>
    
                {currentStep === 'intro' ? (
                  <>
                    <Text style={props.styles.TicTacToeGameTitle}>
                      {"Tic Tac Toe"}
                    </Text>
                    <Text style={props.styles.TicTacToeHeadline}>
                      {"Hello Player!"}
                    </Text>
                    <Text style={props.styles.TicTacToeText}>
                      {"Join the game and show your buddy what you got."}
                    </Text>
                    <TouchableOpacity style={props.styles.TicTacToePrimaryButton} onPress={() => setCurrentStep('create-or-join')}>
                      <Text style={props.styles.TicTacToePrimaryButtonText}>
                        {"Start"}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  null
                )}
    
                {currentStep === 'create-or-join' ? (
                  <>
                    <TouchableOpacity style={props.styles.TicTacToePrimaryButton} onPress={() => createGame()}>
                      <Text style={props.styles.TicTacToePrimaryButtonText}>
                        {"Create a Group"}
                      </Text>
                    </TouchableOpacity>
                    <View style={props.styles.TicTacToeOrDividerRow}>
                      <View style={props.styles.TicTacToeOrDivider} />
                      <Text style={props.styles.TicTacToeOrDividerText}>
                        {"or"}
                      </Text>
                      <View style={props.styles.TicTacToeOrDivider} />
                    </View>
                    <Text style={{...props.styles.TicTacToeText, textAlign: 'left'}}>
                      {"Enter a code to join a group:"}
                    </Text>
                    <View style={props.styles.TicTacToeEnterCodeRow}>
                      <TextInput style={props.styles.TicTacToeCodeTextbox} placeholder="????" value={gameCode} onChangeText={text => setGameCode(text)} maxLength={4} />
                      <TouchableOpacity style={gameCode.length === 4 ? {...props.styles.TicTacToePrimaryButton, marginTop: 0, marginLeft: 6, width: "auto"} : {...props.styles.TicTacToePrimaryButtonDisabled, marginTop: 0, marginLeft: 6, width: "auto"}} onPress={() => joinGame()}>
                        <Text style={props.styles.TicTacToePrimaryButtonText}>
                          {"Find Group"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  null
                )}
    
                {currentStep === 'get-name' ? (
                  <>
                    <Text style={props.styles.TicTacToeHeadline}>
                      {"Whats your name player?"}
                    </Text>
                    <View style={props.styles.TicTacToeEnterCodeRow}>
                      <TextInput style={props.styles.TicTacToeTextbox} placeholder={"Name please..."} value={userName} onChangeText={text => setUserName(text)} />
                      <TouchableOpacity style={userName.length > 0 ? {...props.styles.TicTacToePrimaryButton, marginTop: 0, marginLeft: 6, width: "auto"} : {...props.styles.TicTacToePrimaryButtonDisabled, marginTop: 0, marginLeft: 6, width: "auto"}} onPress={() => updateName()}>
                        <Text style={props.styles.TicTacToePrimaryButtonText}>
                          {"Join"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  null
                )}
    
                {currentStep === 'error-game-not-found' ? (
                  <>
                    <Text style={props.styles.TicTacToeText}>
                      {"Could not find your game. Have you provided the correct Group Code?"}
                    </Text>
                    <TouchableOpacity style={props.styles.TicTacToePrimaryButton} onClick={() => setCurrentStep('create-or-join')}>
                      <Text style={props.styles.TicTacToePrimaryButtonText}>
                        {"Go Back"}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  null
                )}
    
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );

    };
      export default Greeting; 
