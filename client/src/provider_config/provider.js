// Web3Context.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import { contractAddress } from '../contract_data/contract_address';
import { contractABI } from '../contract_data/contract_ABI';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      if (window.ethereum!=='undefined') {
        
        try {
            const web3Instance = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWeb3(web3Instance);
            const accounts = await web3Instance.eth.getAccounts();
            setAccounts(accounts);
            const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
            setContract(contractInstance);
            console.log("My address: ",accounts[0]);
        } catch (error) {
          console.error(error);
        }
      }
      else {
        console.log('Please install MetaMask!');
      }
    };
    initialize();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, accounts, contract }}>
      {children}
    </Web3Context.Provider>
  );
};
