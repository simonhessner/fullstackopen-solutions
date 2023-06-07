import axios from 'axios'

import { useState, useEffect } from "react";

const Filter = ({ value, changeFilter }) => (
  <>
    find countries <input value={value} onChange={changeFilter} />
  </>
)

const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(x => (
          <li key={x[0]}>{x[1]}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </div>
  )
}

const Result = ({ countries, selectCountry }) => {
  const matches = countries.length

  if (matches == 0) {
    return <div>Not found</div>
  }
  
  if (matches > 10) {
    return <div>Too many matches ({matches}), specify another filter</div>
  }

  if (countries.length > 1) {
    return (
      <div>
        <ul>
          {countries.map(c => (
            <li key={c.name.common}>{c.name.common} <button onClick={() => selectCountry(c)}>show</button></li>
          ))}
        </ul>
      </div>
    )
  }

  return <CountryData country={countries[0]} />
}

function App() {
  const [data, setData] = useState(null)
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(result => {
        setData(result.data)
      })
  }, [])

  if(data === null) return "Loading..."

  const matches = data.filter(x => x.name.common.toLowerCase().includes(filter.toLowerCase()))

  const selectCountry = (country) => {
    setFilter(country.name.common)
  }

  return (
    <div>
      <Filter value={filter} changeFilter={e => setFilter(e.target.value)} />
      <Result countries={matches} selectCountry={selectCountry} />
    </div>
  );
}

export default App;
