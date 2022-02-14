import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

class Character {
  name: string;
  id: number | null;

  constructor(data: Record<string, any>) {
    this.name = data?.name || '';
    this.id = data?.id || null;
  }
}

function App() {
  const [counter, setCounter] = useState(0);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res: AxiosResponse = await axios.get('https://rickandmortyapi.com/api/character');
      setCharacters(res.data.results.map((character: Record<string, any>) => new Character(character)));
    } catch (e) {
      console.error(e);
    }
  }

  const list = () => {
    return characters.map((character:Character) => <li key={character.id}>{character.name}</li>);
  }

  return (
    <div className="App">
      {counter}
      <button
          onClick={() => setCounter(counter + 1)}
      >
        Click!
      </button>
      <button
          onClick={() => getData()}
      >
        Get Data!
      </button>
      {list()}
    </div>
  );
}

export default App;
