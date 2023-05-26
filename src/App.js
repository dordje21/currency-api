import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cur, setCur] = useState([])
  const [rate, setRate] = useState(0);
  const [wallet, setWallet] = useState('EUR');
  const _api = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20230519&json'

    useEffect(() => {
     async function getValue() {
      try{
        await fetch(_api).then((response) => response.json()).then((data) => {
          setCur(data)
          console.log(data)
          setRate(data.find(e => e.cc === wallet).rate);
        }).catch(err => {
          console.log(`${err}`);
          setRate('No result')
        });
      } catch(e){
        console.log(e)
      }
    }
      getValue()
    }, [wallet])
    
  return (
    <div className="App">
      <header className="App-header">
        {rate}
          <select
            value={wallet}
            onChange={e => setWallet(e.target.value)}
          > 
            {cur.map( e =>
              <option value={e.cc}>{e.cc}</option>
            )}  
          </select>
      </header>
    </div>
  );
}

export default App;
