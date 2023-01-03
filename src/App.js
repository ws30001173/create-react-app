import React, { useEffect, useState } from "react";
import './App.css';

const getEthereumObject = () => window.ethereum;

/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */
const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    /*
     * First make sure we have access to the Ethereum object.
     */
    if (!ethereum) {
      console.error("Make sure you have Metamask installed!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts"});

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Find the connected account:", accounts);
      return account;
    } else {
      console.log("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");

  // connect to wallet
  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
          method: "eth_requestAccounts",
      });

        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    };

  /*
  * The passed callback function will be run when the page loads
  * More technically, when the App component "Mounts".
  */
  useEffect(() => {
    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    });
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
      </div>

      <div className="bio">
        get to know how ethereum object injected into the browser window object~
        connect the wallet and wave at me!
      </div>

      <button className="waveButton" onClick={null}>
        Wave at me
      </button>

     {/* If there is no current account render this button */}
  
      {!currentAccount && (
        <button className="waveButton" onClick={connectWallet}>
         Connect Wallet
        </button>
      )}
    </div>
  </div>
  );
}
export default App;
