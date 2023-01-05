import React, { useEffect, useState } from "react";
import './App.css';
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";

const getEthereumObject = () => window.ethereum;

/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */
const findMetaMaskAccount =  async () => {
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

  const contractAddress = "0xa3a0d27CEf32B479e362A06AA003960cBA70e997";

  // reference the abi content
  const contractABI = abi.abi;
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

  const wave = async () => {
    try {
      const { ethereum } = window; // equal to: const ethereum = window.ethereum;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum); // use nodes wallet provides to send and receive data
        const signer = provider.getSigner();
        // contract infos include ABI
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

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

      <button className="waveButton" onClick={wave}>
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
