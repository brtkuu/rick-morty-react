import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import "../App.scss";
import Header from "./molecules/Header";
import Pagination from "./molecules/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../reducers/favorites";

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
		this.name = data?.name || "";
		this.id = data?.id || null;
		this.image = data?.image || "";
		this.status = data?.status || "";
		this.gender = data?.gender || "";
		this.species = data?.species || "";
		this.lastEpisode = lastEpisode;
	}
}

function App() {
	const [counter, setCounter] = useState(1);
	const [characters, setCharacters] = useState([]);
	const [pagesNumber, setPagesNumber] = useState(0);
	const [searchName, setSearchName] = useState("");
	const location = useLocation();
	const dispatch = useAppDispatch();
	const {favorites} = useAppSelector((state) => state.favorites);

	//mounted

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const page = queryParams.get("page");
		const name = queryParams.get("name");

		if (page && !isNaN(parseInt(page))) {
			setCounter(parseInt(page));
		}

		if (name) {
			setSearchName(name);
		}
		getData(counter, searchName);
	}, []);

	//pagination
	useEffect(() => {
		getData(counter);
	}, [counter]);

	//getting last episode
	const getLastEpisode = async (url: string): Promise<string | undefined> => {
		try {
			const res: AxiosResponse = await axios.get(url);
			return res.data.episode as string;
		} catch (e) {
			console.error(e);
		}
	};

	//getting data by api
	const getData = async (page: number = 1, name: string = "") => {
		try {
			const res: AxiosResponse = await axios.get(
				`https://rickandmortyapi.com/api/character?page=${page}${
					name ? `&name=${name}` : ""
				}`
			);
			const charactersArray: Array<Character> = await Promise.all(
				res.data.results.map(async (character: Record<string, any>) => {
					const lastEpisode = (await getLastEpisode(
						character.episode[0] as string
					)) as string;
					return new Character(character, lastEpisode);
				})
			);

			setPagesNumber(res.data.info.pages as number);

			setCharacters(charactersArray as never[]);
		} catch (e) {
			console.error(e);
		}
	};

	//handle search
	const handleSearch = (name: string = "") => {
		setSearchName(name);
		getData(1, name);
	};

	//add to fav
	const toggleFavorites = (id: number) => {
		if(favorites.includes(id)) {
			dispatch(REMOVE_FAVORITE(id));
		} else {
			dispatch(ADD_FAVORITE(id));
		}
	};

	//render list of characters
	const list = () => {
		return characters.map((character: Character) => (
			<div
				className={`character-list__element ${
					favorites.includes(character.id as number)
						? "favorite"
						: ""
				}`}
				key={character.id}
			>
				<div className="character-list__image-container">
					<img
						className={`character-list__image ${
							character.status === "Dead"
								? "character-list__dead"
								: ""
						}`}
						alt={character.name}
						src={character.image}
					/>
					{character.status === "Dead" && (
						<img
							className="character-list__image-ribbon"
							alt="ribbon"
							src="./images/ribbon.png"
						/>
					)}
				</div>
				<p>{character.id}</p>
				<p>{character.name}</p>
				<p>{character.gender}</p>
				<p>{character.species}</p>
				<p>{character.lastEpisode}</p>
				<p>
					<FontAwesomeIcon
						icon={faStar}
						onClick={() => toggleFavorites(character.id as number)}
					/>
				</p>
			</div>
		));
	};

	return (
		<div className="App">
			<React.StrictMode>
				<Header name={searchName} handleSearch={handleSearch} />
				<div className="character-list__container">
					<div className="character-list__element character-list__header">
						<p className="character-list__header-element">Photo</p>
						<p className="character-list__header-element">
							Characted ID
						</p>
						<p className="character-list__header-element">Name</p>
						<p className="character-list__header-element">Gender</p>
						<p className="character-list__header-element">
							Species
						</p>
						<p className="character-list__header-element">
							Last Episode
						</p>
						<p
							className="character-list__header-element"
						>
							Favorite
						</p>
					</div>
					{list()}
				</div>
				<Pagination
					pagesNumber={pagesNumber}
					currentPage={counter}
					prevPage={() => {
						setCounter(counter > 1 ? counter - 1 : 1);
					}}
					nextPage={() => {
						setCounter(
							counter < pagesNumber ? counter + 1 : pagesNumber
						);
					}}
					setPage={(page: number) => {
						setCounter(page);
					}}
				/>
				<img
					className="portal"
					src="./images/portal.png"
					alt="portal"
				/>
			</React.StrictMode>
		</div>
	);
}

export default App;
