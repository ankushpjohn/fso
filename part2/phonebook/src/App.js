import { useState } from "react";

const Filter = ({ searchTerm, handleSearchTerm }) => {
  return (
    <form>
      <div>
        <label htmlFor="search">filter shown with</label>
        <input value={searchTerm} onChange={handleSearchTerm} />
      </div>
    </form>
  );
};

const Add = ({
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
  addName,
}) => {
  return (
    <form>
      <legend>
        <h3>add a new</h3>
      </legend>
      <div>
        <label htmlFor="name">name: </label>
        <input value={newName} onChange={handleNewName} id="name" />
      </div>
      <div>
        <label htmlFor="number">number: </label>
        <input value={newNumber} onChange={handleNewNumber} id="number" />
      </div>
      <div>
        <button type="submit" onClick={addName}>
          add
        </button>
      </div>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  );
};

const List = ({ searched }) => {
  return (
    <ul>
      {searched.map((person) => {
        return <Person person={person} key={person.name} />;
      })}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Ankush John", number: "+91 61291 53824" },
    { name: "Gayatri Mestry", number: "+91 61279 54209" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(persons);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    if (searched.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = { name: newName, number: newNumber };
      const searchedCopy = [...searched];
      searchedCopy.push(nameObject);
      setSearched(searchedCopy);
      setPersons(searchedCopy);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleSearchTerm = (event) => {
    const temp = event.target.value;
    setSearchTerm(temp);

    const reg = new RegExp(temp, "i");
    if (temp === "") setSearched(persons);
    else
      setSearched(
        persons.filter((person) => {
          if (person.name.search(reg) !== -1) return true;
          return false;
        })
      );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
      <Add
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addName={addName}
      />
      <h3>Numbers</h3>
      <List searched={searched} />
    </div>
  );
};

export default App;
