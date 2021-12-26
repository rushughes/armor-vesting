import logo from './logo.svg';
import './App.css';

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

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

function App() {

  async function showPortis() {
      if (!provider) {
        const web3Modal = new Web3Modal({
          cacheProvider: true, // optional
          providerOptions // required
        });
        web3 = await connect(web3Modal);
      }

      //provider._portis.showPortis();

      if (!accounts) {
        accounts = await web3.eth.getAccounts();
        console.log(`Wallet address: ${accounts[0].toLowerCase()}`);
      }
    }

    async function connect(web3Modal) {
      provider = await web3Modal.connect();
      return new Web3(provider);
    }


  return (
    <div className="App">
      <header className="App-header">
        Ethereum Test
      </header>
      <Button type="primary" onClick={() => showPortis()}>
          Connect
        </Button>
    </div>
  );
}

export default App;
