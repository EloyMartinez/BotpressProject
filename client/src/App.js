import React, { useEffect, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {RecursiveTree} from './recursiveTree'

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
  }, );
//// if no child then doesnt display
  return (
  
    <div className="App"
    style={{
      marginLeft: "10px",
      marginTop: "30px",
      textAlign: "left"
    }}>
      <h1 >File Explorer</h1>
     <RecursiveTree listMeta={[data]}/>    
    </div>
  );
}


export default App;
