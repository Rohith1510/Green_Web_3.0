import React,{ useEffect, useState } from "react";
import { ethers } from "ethers";
import faucetContract from "./faucet";
import {Link} from 'react-router-dom';
import "./Faucet.css";
import "../index.css";
import { Button } from "@chakra-ui/react";

function GreenFaucetUi() {
    const [walletAddress, setWalletAddress] = useState("");
    const [signer, setSigner] = useState();
    const [fcContract, setFcContract] = useState();
    const [withdrawError, setWithdrawError] = useState("");
    const [withdrawSuccess, setWithdrawSuccess] = useState("");
    const [transactionData, setTransactionData] = useState("");
  
    useEffect(() => {
      getCurrentWalletConnected();
      addWalletListener();
    }, [walletAddress]);
  
    const connectWallet = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
          /* get provider */
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          /* get accounts */
          const accounts = await provider.send("eth_requestAccounts", []);
          /* get signer */
          setSigner(provider.getSigner());
          /* local contract instance */
          setFcContract(faucetContract(provider));
          /* set active wallet address */
          setWalletAddress(accounts[0]);
        } catch (err) {
          console.error(err.message);
        }
      } else {
        /* MetaMask is not installed */
        console.log("Please install MetaMask");
      }
    };
  
    const getCurrentWalletConnected = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
          /* get provider */
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          /* get accounts */
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            /* get signer */
            setSigner(provider.getSigner());
            /* local contract instance */
            setFcContract(faucetContract(provider));
            /* set active wallet address */
            setWalletAddress(accounts[0]);
          } else {
            console.log("Connect to MetaMask using the Connect Wallet button");
          }
        } catch (err) {
          console.error(err.message);
        }
      } else {
        /* MetaMask is not installed */
        console.log("Please install MetaMask");
      }
    };
  
    const addWalletListener = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        window.ethereum.on("accountsChanged", (accounts) => {
          setWalletAddress(accounts[0]);
        });
      } else {
        /* MetaMask is not installed */
        setWalletAddress("");
        console.log("Please install MetaMask");
      }
    };
  
    const getGETHandler = async () => {
      setWithdrawError("");
      setWithdrawSuccess("");
      try {
        const fcContractWithSigner = fcContract.connect(signer);
        const resp = await fcContractWithSigner.requestTokens();
        setWithdrawSuccess("Operation succeeded - enjoy your tokens!");
        setTransactionData(resp.hash);
      } catch (err) {
        setWithdrawError(err.message);
      }
    };
  
    return (
      <div className="faucetUI">
        <nav style={{backgroundColor: "black"}}>
        <div >
            <h1 style={{color: "whitesmoke", fontSize: "2rem", paddingLeft: "2rem"}} >GREEN TOKEN (GET)</h1>
            <div style={{marginTop: "-2rem"}}>
            <button style={{color: "whitesmoke", marginLeft: "51rem"}} onClick={connectWallet} >
                <span > {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}  </span>
            </button>
            <Button color="Black" marginLeft="6rem" marginBottom="1rem"  _hover={{ backgroundColor: "#00ffcc" }}><Link to='/Post'>Go To Home</Link></Button>
            </div> 
        </div>
        </nav>
        <section className="hero is-fullheight">
          <div className="faucet-hero-body">
            <div >
              <h1 style={{color: "white", marginLeft:"35rem", fontSize:"2rem", paddingRight:"20rem"}}>Faucet</h1>
              <p style={{color: "white", marginLeft:"29rem", fontSize:"1.5rem", paddingRight:"14rem"}}>Fast and reliable. 50 GET/day.</p>
              <div className="mt-5">
                {withdrawError && (
                  <div className="withdraw-error">{withdrawError}</div>
                )}
                {withdrawSuccess && (
                  <div className="withdraw-success">{withdrawSuccess}</div>
                )}{" "}
              </div>
              <div className="box address-box">
                <div className="columns">
                  <div style={{paddingLeft:"22rem"}}>
                    <input style={{height:"2.5rem", width:"29rem"}} type="text" placeholder="Enter your wallet address (0x...)" defaultValue={walletAddress} />
                  </div>
                  <div style={{paddingLeft:"32rem", marginTop:"2rem", paddingBottom:"2rem"}}>
                    <Button onClick={getGETHandler} disabled={walletAddress ? false : true} color="Black"  _hover={{ backgroundColor: "#33ccff" }}>
                      GET TOKENS
                    </Button>
                  </div>
                </div>
                <article style={{paddingBottom:"5rem"}}>
                  <p className="panel-heading">Transaction Data</p>
                  <div className="panel-block">
                    <p>
                      {transactionData
                        ? `Transaction hash: ${transactionData}`
                        : "--"}
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default GreenFaucetUi;
