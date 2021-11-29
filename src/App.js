import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { ConnectedContainer, NotConnectedContainer } from './components';
// MOCK DATA
const TEST_GIFS = [
	'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
	'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
	'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
	'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
];

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [ walletAddress, setWalletAddress ] = useState(null);
  const [gifList, setGifList] = useState([]);
  const checkIfWalletIsConnected = () => {
    try {
      const { solana } = window;
      if(solana) {
        if(!solana.isPhantom) {
          console.log("You have Phantom Installed!");
        }
        const onConnect = solana.connect({ onlyIfTrusted: true });
        onConnect.then((response) => {
          console.log('Connected with Public Key', response.publicKey.toString());
          return response.publicKey.toString();
        }).then(key => setWalletAddress(key));
      } else {
        throw new Error('Need Phantom Wallet installed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const connectWallet = () => {
    const { solana } = window;
    if(solana) {
      const connectToWallet = solana.connect();
      connectToWallet.then((response) => {
        return response.publicKey.toString();
      }).then(key => setWalletAddress(key));
    }
  };


  useEffect(() => {
    const onLoad = () => {
      checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');

      // Call Solana program here.

      // Set state
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={ walletAddress ? "auth-container" : "container" }>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          { !walletAddress && <NotConnectedContainer onClick={connectWallet} /> }
          {  walletAddress && <ConnectedContainer gifs={gifList} /> }
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
