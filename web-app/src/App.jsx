import React, { useEffect, useState } from "react";
import './App.css'
import { CONTRACT_ADDRESS, transformCharacterData } from "./utils/constants.js";
import epicGame from "./utils/epic_game_contract.json";
import { ethers } from "ethers";
import Arena from './Components/Arena';
import LoadingIndicator from "./Components/LoadingIndicator";

import SelectCharacter from "./Components/SelectCharacter/SelectCharacter.jsx";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  
  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }
    
    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
          <img
            src="https://i.imgur.com/NqlaaTJ.gif"
            alt="Nascimento Gif"
          />
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWalletAction}
          >
            Conecte sua carteira para começar
          </button>
        </div>
      );
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    } else if (currentAccount && characterNFT) {
    return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {

      const { ethereum } = window;
      if (!ethereum) {
        console.log("Eu acho que você não tem a metamask!");
        setIsLoading(false);

        return;
      } else {
        console.log("Nós temos o objeto ethereum", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Carteira conectada::", account);
        setCurrentAccount(account);
      } else {
        console.log("Não encontramos uma carteira conectada");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Instale a MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Contectado", accounts[0]);
      setCurrentAccount(accounts[0]);

    } catch (e) {

    }
  }

  useEffect(() => {
    setIsLoading(true);

    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    const fetchNFTMetadata = async () => {

      try {
        console.log("Verificando pelo personagem NFT no endereço:", currentAccount);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const gameContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          epicGame.abi,
          signer
        );

        const txn = await gameContract.checkIfUserHasNFT();
        if (txn.name) {
          console.log("Usuário tem um personagem NFT");
          setCharacterNFT(transformCharacterData(txn));
        } else {
          console.log("Nenhum personagem NFT foi encontrado");
        }

        setIsLoading(false);

      } catch (err) {
        console.log(err)
      }
    };

    if (currentAccount) {
      console.log("Conta Atual:", currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Batalhas no Metaverso ⚔️</p>
          <p className="sub-text">Junte-se a mim para vencer os inimigos do Metaverso!</p>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default App
