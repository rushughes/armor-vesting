import './App.css';

import React, { Component } from 'react';

import vestingContract from './contracts/Vesting.json';

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID
    }
  }
};

let provider = null;
let accounts = null;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      contractAddress: '0x9b36C7c1C5ee9B44788D95b11DE3019f4c0c715e',
      contract: null,
      account: null,
      claimableAmount: null,
      grantedToken: null,
      releasable: null,
      released: null,
      starts: null,
    }
  }

  async showPortis() {
      if (!provider) {
        const web3Modal = new Web3Modal({
          cacheProvider: true, // optional
          providerOptions // required
        });
        this.setState({ web3: await this.connect(web3Modal) });
      }

      //provider._portis.showPortis();

      if (!this.state.accounts) {
        accounts = await this.state.web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        console.log(`Wallet address: ${this.state.account.toLowerCase()}`);
        this.print(`Wallet address: ${this.state.account.toLowerCase()}`);

      }
    }

    async connect(web3Modal) {
      provider = await web3Modal.connect();
      return new Web3(provider);
    }

  print(str) {
     // const p = document.createElement("p");
     // p.innerText = str;
     // document.getElementById("userWalletAddress").appendChild(p);
   }

  scan = async (event) => {
     event.preventDefault();
     console.log('scan');
     console.log(vestingContract);

     const contract = new this.state.web3.eth.Contract(vestingContract, this.state.contractAddress);
     const claimableAmount = await contract.methods.claimableAmount(this.state.account).call();
     this.setState({ claimableAmount });

     const grantedToken = await contract.methods.grantedToken(this.state.account).call();
     this.setState({ grantedToken });

     const releasable = await contract.methods.releasable(this.state.account).call();
     this.setState({ releasable });

     const released = await contract.methods.released(this.state.account).call();
     this.setState({ released });

     const starts = await contract.methods.starts(this.state.account).call();
     this.setState({ starts });
   }

   claim() {
     const contract = new this.state.web3.eth.Contract(vestingContract, this.state.contractAddress);
     contract.methods.claim().send({ from: this.state.account })
   }

   render() {
     return (
       <Container className="p-3">
        <h1 className="header">Armor Vesting</h1>
        <Button type="primary" onClick={() => this.showPortis()}>
          Connect
        </Button>
        <Form onSubmit={this.scan}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Contract address</Form.Label>
            <Form.Control type="text" defaultValue={this.state.contractAddress} name="contractAddress"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Scan
          </Button>
        </Form>
        <ul>
          <li>Account: {this.state.account}</li>
          <li>Contract Address: {this.state.contractAddress}</li>
          <li>Claimable Amount: {this.state.claimableAmount}</li>
          <li>Granted Token: {this.state.grantedToken}</li>
          <li>Releasable: {this.state.releasable}</li>
          <li>Released: {this.state.released}</li>
          <li>Starts: {this.state.starts}</li>
        </ul>
        <Button type="primary" onClick={() => this.claim()}>
          Claim
        </Button>
      </Container>
    );
  }
}

export default App;
