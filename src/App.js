import "./App.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import erc721Abi from "./abi/erc721.json";
import Header from "./components/Header";

function App() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null);

  const balance = async (tokenAddress) => {
    const contract = new ethers.Contract(tokenAddress, erc721Abi, signer);
    const balance = await contract.balanceOf(account);
    console.log(balance.toString());
  };

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
      setAccount(accounts[0]);
    } else {
      console.log("Please install metamask.");
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <div className="page">
      <Header connect={connect} account={account} />
      <div className="main">
        <p>Dapp starter</p>
        <br />
        <button
          className="button"
          onClick={() => balance("0xaDC28cac9c1d53cC7457b11CC9423903dc09DDDc")}
        >
          Get Balance
        </button>
      </div>
    </div>
  );
}

export default App;
