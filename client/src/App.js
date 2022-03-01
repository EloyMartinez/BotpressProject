import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { RecursiveTree } from "./recursiveTree";
import { styles } from "./styles";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      setData(JSON.parse(message.data));
    };
  }, []);

  return (
    <div style={styles.mainContainer}>
      <h1 style={styles.titleContainer}>File Explorer</h1>

      {data.children ? (
        <RecursiveTree
          listMeta={[data]}
          onSelectCallback={(arg) => console.log(arg)}
          style={{
            marginLeft: "10px",
            marginTop: "30px",
            alignItems: "center",
          }}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
