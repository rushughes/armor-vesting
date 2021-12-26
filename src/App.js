import './App.css';

import React, { Component } from 'react';

import vestingContract from './contracts/Vesting.json';
import contract from 'truffle-contract'


import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "9e4db1dc4a18481ba61bcac2ccdf0827" // required
    }
  }
};

let provider = null;
let web3 = null;
let accounts = null;

class App extends Component {

  async showPortis() {
      if (!provider) {
        const web3Modal = new Web3Modal({
          cacheProvider: true, // optional
          providerOptions // required
        });
        web3 = await this.connect(web3Modal);
      }

      //provider._portis.showPortis();

      if (!accounts) {
        accounts = await web3.eth.getAccounts();
        console.log(`Wallet address: ${accounts[0].toLowerCase()}`);
        this.print(`Wallet address: ${accounts[0].toLowerCase()}`);

      }
    }

    async connect(web3Modal) {
      provider = await web3Modal.connect();
      return new Web3(provider);
    }

  print(str) {
     const p = document.createElement("p");
     p.innerText = str;
     document.getElementById("userWalletAddress").appendChild(p);
   }

   async scan() {
     console.log('scan');
     // this.contract = contract(vestingContract);
     // this.contract.setProvider(provider);
     // let contractInstance = await this.contract.deployed()
     // console.log ('grantedToken' + contractInstance.grantedToken());
   }

   async claim() {

   }

   render() {
     return (
       <Container className="p-3">
        <h1 className="header">Armor Vesting</h1>
        <Button type="primary" onClick={() => this.showPortis()}>
          Connect
        </Button>
        <pre id="userWalletAddress"></pre>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Contract address</Form.Label>
            <Form.Control type="text" defaultValue="0x9b36C7c1C5ee9B44788D95b11DE3019f4c0c715e" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={() => this.scan()}>
            Scan
          </Button>
        </Form>
        <ul>
          <li>ARMOR price (coingecko): $0.06</li>
          <li>Wallet balance:  0.00</li>
          <li>Claimable right now:  0.00</li>
          <li>Claimable in future:  0.00</li>
          <li>Vesting will end on January 23rd 2023</li>
        </ul>
        <Button type="primary" onClick={() => this.claim()}>
          Claim
        </Button>
      </Container>
    );
  }
}

export default App;
