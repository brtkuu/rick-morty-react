import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import '../App.scss';
import Header from './molecules/Header';
import Pagination from './molecules/Pagination';

class Character {
  name: string;
  id: number | null;
  image: string;
  status: string;
  gender: string;
  species: string;
  lastEpisodeUrl: string | undefined;
  lastEpisode: string;

  constructor(data: Record<string, any>, lastEpisode: string) {
    this.name = data?.name || '';
    this.id = data?.id || null;
    this.image = data?.image || '';
    this.status = data?.status || '';
    this.gender = data?.gender || '';
    this.species = data?.species || '';
    this.lastEpisode = lastEpisode;
  }
}

function App() {
  const [counter, setCounter] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [pagesNumber, setPagesNumber] = useState(0);

  useEffect(() => {
    getData();
  }, );

  useEffect(() => {
    getData(counter);
  }, [counter]);

  const getLastEpisode = async (url: string):Promise<string | undefined> => {
    try {
      const res: AxiosResponse = await axios.get(url);
      return res.data.episode as string;
    } catch (e) {
      console.error(e);
    }
  }

  const getData = async (page = 1, name = '') => {
    try {
      const res: AxiosResponse = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}${name ? `&name=${name}`:''}`);
      const charactersArray: Array<Character> = (await Promise.all(res.data.results.map(async (character: Record<string, any>) => {
        const lastEpisode = (await getLastEpisode(character.episode[0] as string)) as string;
        return new Character(character, lastEpisode);
      })));

      setPagesNumber(res.data.info.pages as number);

      setCharacters(charactersArray as never[]);
    } catch (e) {
      console.error(e);
    }
  }

  const handleSearch = (name = '') => {
    getData(1, name);
  }

  const list = () => {
    return characters.map((character:Character) => <div className="character-list__element" key={character.id}>
      <div className="character-list__image-container">
        <img className={`character-list__image ${character.status === 'Dead' ? 'character-list__dead' : ''}`} alt={character.name} src={character.image} />
        { character.status === 'Dead' &&
          <img className='character-list__image-ribbon' alt="ribbon" src="./images/ribbon.png" />
        }
      </div>
      <p>{character.id}</p>
      <p>{character.name}</p>
      <p>{character.gender}</p>
      <p>{character.species}</p>
      <p>{character.lastEpisode}</p>
    </div>);
  }

  return (
    <div className="App">
      <Header name="Hello!" handleSearch={handleSearch}/>
      <div className="character-list__container">
        <div className="character-list__element character-list__header">
          <p className="character-list__header-element">
            Photo
          </p>
          <p className="character-list__header-element">
            Characted ID
          </p>
          <p className="character-list__header-element">
            Name
          </p>
          <p className="character-list__header-element">
            Gender
          </p>
          <p className="character-list__header-element">
            Species
          </p>
          <p className="character-list__header-element">
            Last Episode
          </p>
        </div>
        {list()}
      </div>
      <Pagination
        pagesNumber={pagesNumber}
        currentPage={counter}
        prevPage={() => {setCounter(counter > 1 ? counter - 1 : 1)}}
        nextPage={() => {setCounter(counter < pagesNumber ? counter + 1 : pagesNumber)}}
      />
    </div>
  );
}

export default App;
