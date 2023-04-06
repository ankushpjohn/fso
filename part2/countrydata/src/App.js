import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css";

const CountryListItem = ({ country, toggleShow }) => {
  let result = [];
  result.push(
    <div key="label">
      {country.name.common}
      <button
        onClick={() => {
          toggleShow(country);
        }}
      >
        {country.show ? "Hide" : "Show"}
      </button>
    </div>
  );
  if (country.show)
    result.push(<Country foundCountry={country} key="content" />);
  return <li>{result}</li>;
};

const Content = ({ searchResults, setSearchResults }) => {
  const toggleShow = (country) => {
    const toggledCountry = { ...country, show: !country.show };
    setSearchResults(
      searchResults.map((c) => (c.cca3 === country.cca3 ? toggledCountry : c))
    );
  };

  if (searchResults.length === 0) {
    return <div>No country found.</div>;
  } else if (searchResults.length === 1) {
    return <Country foundCountry={searchResults[0]} />;
  } else if (searchResults.length > 10) {
    return <div>Too many matches. Please be more specific.</div>;
  } else {
    return (
      <div>
        <h3>Countries found:</h3>
        <ul>
          {searchResults.map((country) => {
            return (
              <CountryListItem
                country={country}
                toggleShow={toggleShow}
                key={country.cca3}
              />
            );
          })}
        </ul>
      </div>
    );
  }
};

const Country = ({ foundCountry }) => {
  let languages = [];
  for (const key in foundCountry.languages) {
    languages.push(foundCountry.languages[key]);
  }

  return (
    <div>
      <h1>{foundCountry.name.common}</h1>
      <div>Capital: {foundCountry.capital}</div>
      <div>
        Area: {foundCountry.area} km<sup>2</sup>
      </div>
      <h3>Languages</h3>
      <ul>
        {languages.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={foundCountry.flags.png} alt={foundCountry.flags.alt} />
    </div>
  );
};

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      setAllCountries(response.data);
    });
  }, []);

  const handleSearchTerm = (event) => {
    if (allCountries.length) {
      const term = event.target.value;
      setSearchTerm(term);
      const reg = new RegExp(term, "i");

      if (term === "") {
        setSearchResults([]);
        return;
      }

      const contains = allCountries.filter(
        (country) => country.name.common.search(reg) !== -1
      );
      const exact = contains.filter(
        (country) => country.name.common.length === term.length
      );

      let temp = exact.length === 1 ? exact : contains;
      temp = temp.map((country) => ({ ...country, show: 0 }));
      setSearchResults(temp);
    }
  };

  return (
    <div>
      <label htmlFor="countrysearch">Search:</label>
      <input
        value={searchTerm}
        onChange={handleSearchTerm}
        id="countrysearch"
        placeholder="Country Name"
      ></input>
      <Content
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
    </div>
  );
};

export default App;
