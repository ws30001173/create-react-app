import React, { useEffect } from "react";
import './App.css';

const getEthereumObject = () => window.ethereum;

const App = () => {
  /*
  * The passed callback function will be run when the page loads
  * More technically, when the App component "Mounts".
  */
  useEffect(() => {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      console.log("Make sure you have metamask");
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        👋 Hey there!
      </div>

      <div className="bio">
        get to know how ethereum object injected into the browser window object~
        connect the wallet and wave at me!
      </div>

      <button className="waveButton" onClick={null}>
        Wave at me
      </button>
    </div>
  );
};

export default App;
