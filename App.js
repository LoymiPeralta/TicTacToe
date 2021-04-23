/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState }  from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//this does not work :(
  
import{
  MaterialCommunityIcons as Icon 
} from 'react-native-vector-icons'


export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
         gameSate: [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ],
         cPlayer: 1,
    }
  };
  initializeGame = () =>{
    this.setState({gameSate: 
     [
       [1,-1,0],
       [0,0,0],
       [0,0,0]
     ]
    });
  }

  ontilePress= (row, col) =>{
    var currentPlayer = this.state.currentPlayer;
  }

  //
  
  findIcon = (row, col) => {
    var value = this.state.gameSate[row][col];
    switch(value)
    {
     case 1 : return <Icon name ="close" style={styles.tileX}/>;
       case -1: return <Icon name ="circle-outline" style={styles.tileX}/>;

    }
  }


   render (){
    return(
  <View style= {styles.Container}> 


     <View style= {{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>

      <TouchableOpacity onPress= {() => ontilePress(0,0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth:0 }]}>
       {this.findIcon(0,0)}
      </TouchableOpacity>
    
      <TouchableOpacity onPress= {() => ontilePress(0,1)} style={[styles.tile, {borderTopWidth: 0,}]} >
      {this.findIcon(0,1)}
       </TouchableOpacity>
      
      <TouchableOpacity onPress= {() => ontilePress(0,2)} style={[styles.tile, {borderTopWidth:0, borderRightWidth: 0, }]}>
      {this.findIcon(0,2)}
      </TouchableOpacity>
      

      </View>
      
   <View style= {{flexDirection: "row"}}>

     
     <TouchableOpacity onPress= {() => ontilePress(1,0)} style={[styles.tile, {borderLeftWidth : 0, }]}>
     {this.findIcon(1,0)}
      </TouchableOpacity>
    
    
     <TouchableOpacity onPress= {() => ontilePress(1,1)} style={styles.tile} >
     {this.findIcon(1,1)}
     </TouchableOpacity>
     

     <TouchableOpacity onPress= {() => ontilePress(1,2)} style={[styles.tile, { borderRightWidth:0, }]} >
     {this.findIcon(1,2)}
     </TouchableOpacity>
     
  </View>

   <View style= {{flexDirection: "row"}}>


     <TouchableOpacity onPress= {() => ontilePress(2,0)} style={[styles.tile, {borderBottomWidth:0, borderLeftWidth: 0}]} >
     {this.findIcon(2,0)}
     </TouchableOpacity>
     
     
     <TouchableOpacity onPress= {() => ontilePress(2,1)} style={[styles.tile, { borderBottomWidth:0, }]} >
     {this.findIcon(2,1)}
      </TouchableOpacity>
      
    
     <TouchableOpacity onPress= {() => ontilePress(2,2)} style={[styles.tile, {borderBottomWidth:0, borderRightWidth: 0, }]} >
     {this.findIcon(2,2)}
    </TouchableOpacity>
   
      
   </View>
      
  </View>

    );
  }
}
       
      
    

const styles = StyleSheet.create({

Container: {
    flex: 1,
    backgroundColor: '#D1CAE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 4,
    width: 110, 
    height: 125,
  },
  tileX:{
    color: "black",
    fontSize: 60, 
    
  }, 
  tileO:{
    color: "White",
    fontSize: 60, 
   
  }, 
  
});

