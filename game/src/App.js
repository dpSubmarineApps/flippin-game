import React from 'react';
import './resources/styles/App.css';
// eslint-disable-next-line no-unused-vars
import style from "./resources/styles/simpsons.css";
// eslint-disable-next-line no-unused-vars
import gameStyle from "./resources/styles/gameboard.css";
import Gameboard from "./components/Gameboard";

function App() {
  return (
    <div className="App">
        <Gameboard/>
    </div>
  );
}

export default App;
