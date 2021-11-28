import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [ walletAddress, setWalletAddress ] = useState(null);
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

  const renderNotConnectedButton = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet!
    </button>
  );

  useEffect(() => {
    const onLoad = () => {
      checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className={ walletAddress ? "auth-container" : "container" }>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {
            !walletAddress && renderNotConnectedButton()
          }
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
