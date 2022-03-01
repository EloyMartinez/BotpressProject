import React, { useEffect, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {RecursiveTree} from './recursiveTree'
import {styles} from './styles'


const client = new W3CWebSocket("ws://127.0.0.1:8000");

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log(JSON.parse(message.data));
      setData(JSON.parse(message.data));
    };
  },[] );


  return (
  
    <div className="App"
    style={styles.mainContainer}>
      <h1 style={styles.titleContainer}>File Explorer</h1>
     
     {data.name === '' ?
     <RecursiveTree listMeta={[data]}  style={{
      marginLeft: "10px",
      marginTop: "30px",
      alignItems: "center"
    }}/>  : 'Loading...'}
    </div>
  );
}


export default App;
