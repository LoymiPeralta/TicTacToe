/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */



import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';



const gameMatrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const styles = {
  
Container: {
  flex: 1,
  backgroundColor: '#D1CAE4',
  alignItems: 'center',
  justifyContent: 'center',
},
  row: {
    flexDirection: 'row'
  },

  cell: {
    backgroundColor: '#D1CAE4',
    width: 100,
    height: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  cellText: {
    fontSize: 24,
    fontWeight: 'bold'
  }
}



const X = 'X';
const O = 'O';

const Map = (mapData, callback) => {
  const mapJsx = [];
  for (let i = 0; i < mapData.length; i++) {
    const row = mapData[i];
    const rowJsx = [];
    for (let j = 0; j < row.length; j++) {
      rowJsx.push(
        <TouchableOpacity
          onPress={() => { callback(i, j) }}
          style={styles.cell}
          key={`cell_${i}_${j}`}>
          <Text style={styles.cellText}>
            {mapData[i][j]}
          </Text>
        </TouchableOpacity>
      )
    }
    mapJsx.push(<View style={styles.row} key={`row_${i}`}>{rowJsx}</View>)
  }

  return mapJsx
}


const getWinner = (gameStage) => {
  let transposed = [[], [], []];
  let diagonals = [[], []];
  for (let i = 0; i < gameStage.length; i++) {
    const row = gameStage[i];
    for (let j = 0; j < row.length; j++) {
      transposed[i][j] = gameStage[j][i];
      if (i === j) {
        diagonals[0][i] = gameStage[i][j];
      }
      if (i === Math.abs(j - (row.length - 1))) {
        diagonals[1][i] = gameStage[i][j];
      }
    }
  }

  const all = gameStage.concat(transposed).concat(diagonals);
  for (let i = 0; i < allLines.length; i++) {
    const line = all[i];
    const equal = line.every((item) => item === line[0]);
    if (equal) {
      return line[0];
    }
  }

  return null;
}

const App: () => React$Node = () => {

  const [gameStage, setGameStage] = useState(gameMatrix);
  const [turnSymbol, setTurnSymbol] = useState(X);
  const [winnerSymbol, setWinnerSymbol] = useState();

  const nextTurnSymbol = () => {
    setTurnSymbol(turnSymbol === X ? O : X);
  }


  const hasNulls = (inputArray) => {
    let hasNulls = false;
    for (let i = 0; i < inputArray.length; i++) {
      const row = inputArray[i];
      for (let j = 0; j < row.length; j++) {
        if (inputArray[i][j] === null) {
          hasNulls = true;
        }
      }
    }

    return hasNulls;
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 32 }}>{!winnerSymbol && `It's  ${turnSymbol}'s turn`}</Text>
          <Text style={{ fontSize: 32 }}>{winnerSymbol}</Text>
          {winnerSymbol && < TouchableOpacity
            onPress={() => {
              setGameStage(gameMatrix);
              setTurnSymbol(X);
              setWinnerSymbol(undefined);
            }}>
            <Text style={{ fontSize: 32, textTransform: 'uppercase' }}>restart</Text>
          </TouchableOpacity>}
        </View>
        <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
          {Map(gameStage, (i, j) => {
            if (winnerSymbol || gameStage[i][j]) {
              return;
            }
            console.log('clicked', i, j);
            const newStage = update(gameStage, {
              [i]: {
                [j]: { $set: turnSymbol }
              }
            })
            nextTurnSymbol();
            setGameStage(newStage);
            const winner = getWinner(newStage);
            if (winner) {
              setWinnerSymbol(`${winner} wins!`)
            } else if (!hasNulls(newStage)) {
              setWinnerSymbol('It is a tie!')
            }
          })}
        </View>

      </SafeAreaView>
    </>
  );
};

export default App;


