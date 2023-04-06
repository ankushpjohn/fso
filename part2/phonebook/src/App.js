import { useState, useEffect } from "react";
import personService from "./sources/persons";
import "./index.css";

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
        <button type="button" onClick={addName}>
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

const List = ({ searching, persons, searchResults, personDelete }) => {
  if (!searching) {
    searchResults = persons;
  }
  return (
    <ul>
      {searchResults.map((person) => {
        return (
          <div key={person.name}>
            <Person person={person} />
            <button
              onClick={() => {
                personDelete(person);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </ul>
  );
};

const Notification = ({ message, setMessage }) => {
  let status;
  if (message[1] === "success") status = "successMessage";
  else status = "errorMessage";
  return message[0] === null ? null : (
    <div className={status}>{message[0]}</div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(persons);
  const [message, setMessage] = useState([null, "success"]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addName = (event) => {
    const toReplace = persons.find((person) => person.name === newName);
    let nameObject = { name: newName, number: newNumber };

    if (toReplace !== undefined) {
      if (
        window.confirm(`${newName} is already added to phonebook. Replace?`)
      ) {
        nameObject = { ...toReplace, ...nameObject };
        personUpdate(toReplace, nameObject);
        setMessage([`Replaced ${nameObject.name}`, "success"]);
      }
    } else {
      personService.create(nameObject).then((response) => {
        setPersons(persons.concat(response));
      });

      setMessage([`Added ${nameObject.name}`, "success"]);
    }

    setTimeout(() => {
      setMessage([null, "success"]);
    }, 1500);
    setSearchTerm("");
    setNewName("");
    setNewNumber("");
  };

  const handleSearchTerm = (event) => {
    const temp = event.target.value;
    setSearchTerm(temp);
    const reg = new RegExp(temp, "i");
    setSearchResults(
      persons.filter((person) => person.name.search(reg) !== -1)
    );
  };

  const personDelete = (toDelete) => {
    if (window.confirm(`Delete ${toDelete.name}?`)) {
      personService.remove(toDelete.id).then(() => {
        setPersons(persons.filter((person) => person.id !== toDelete.id));
        setMessage([`Deleted ${toDelete.name}`, "success"]);
      });
    }
    setTimeout(() => {
      setMessage([null, "success"]);
    }, 1500);
    setSearchTerm("");
    setNewName("");
    setNewNumber("");
  };

  const personUpdate = (prev, next) => {
    personService
      .update(prev.id, next)
      .then(() => {
        const newPersons = persons.filter((person) => {
          return person.id !== prev.id;
        });
        setPersons(newPersons.concat(next));
      })
      .catch(() => {
        setMessage([
          `Information of ${next.name} has already been removed. Refresh your Page.`,
          "error",
        ]);
      });
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
      <List
        searching={searchTerm !== ""}
        persons={persons}
        searchResults={searchResults}
        personDelete={personDelete}
      />
      <Notification message={message} setMessage={setMessage} />
      {}
    </div>
  );
};

export default App;
