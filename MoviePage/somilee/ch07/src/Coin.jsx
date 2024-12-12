import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [account, setAccount] = useState(0);
  const onChange = (event) => setAccount(event.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <select>
            {coins.map((coin) => (
              <option>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <form>
            <input onChange={onChange} type="int" />
            <button>Calculate</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
