import { useState } from 'react';

const sendGif = (inputValue) => {
  if (inputValue.length > 0) {
    console.log('Gif link:', inputValue);
  } else {
    console.log('Empty input. Try again.');
  }
};

export const ConnectedContainer = ({ gifs }) => {
  const [ inputValue, setInputValue ] = useState('');
  const onChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  return (<div className="connected-container">
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendGif(inputValue);
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        placeholder="Enter url"
      />
      <button type="submit" className="cta-button submit-gif-button">Submit</button>
    </form>
    <div className="gif-grid">
      {
        gifs.map(g => (
          <div className="gif-item" key={g}>
            <img src={g} alt={g}/>
          </div>
        ))
      }
    </div>
  </div>
)};

export const NotConnectedContainer = ({ onClick }) => (
  <button
    className="cta-button connect-wallet-button"
    onClick={onClick}
  >
    Connect to Wallet!
  </button>
);
