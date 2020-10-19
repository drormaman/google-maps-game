import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { countriesState } from "../Atoms/countries";
import { timerState } from "../Atoms/timer";
import { userGuessesState } from "../Atoms/userGuesses";
import { guessIndexState } from "../Atoms/guessIndex";

import Map from "./Map";
import ScoreBoard from "./ScoreBoard";
import Timer from "./Timer";

function Game() {
	const [gameStart, setGameStart] = useState(false);

	const [guessIndex, setGuessIndex] = useRecoilState(guessIndexState);
	// const [timer, setTimer] = useRecoilState(timerState);
	const [countries, setCountries] = useRecoilState(countriesState);
	const [userGuesses, setUserGuesses] = useRecoilState(userGuessesState);
	console.log(gameStart);
	useEffect(() => {
		getRandomCountries(10);
	}, [gameStart]);
	useEffect(() => {
		if (guessIndex > 9) setGameStart(false);
	}, [guessIndex]);

	async function getRandomCountries(numOfCountries) {
		const resp = await fetch(
			"https://restcountries.eu/rest/v2/all?fields=name;latlng"
		);
		const countriesData = await resp.json();
		const randomIndex = new Array(numOfCountries);
		for (let i = 0; i < randomIndex.length; i++) {
			randomIndex[i] = Math.floor(Math.random() * countriesData.length);
		}
		console.log(randomIndex);
		const countriesArr = randomIndex.map(n => countriesData[n]);
		console.log(countriesArr);
		setCountries(countriesArr);
	}

	const handleUserGuess = e => {
		const guesses = userGuesses.slice();
		guesses[guessIndex] = {
			latLng: {
				lat: Number(e.latLng.lat().toFixed(2)),
				lng: Number(e.latLng.lng().toFixed(2))
			}

			// timeLeft: timer
		};
		setUserGuesses(guesses);
		setGuessIndex(i => i + 1);
		// setTimer(10);
	};

	return (
		<div>
			{gameStart ? (
				<>
					<h2>{countries[guessIndex]?.name}</h2>
					{/* <Timer /> */}
					<Map
						center={userGuesses[guessIndex - 1]?.latLng || { lat: 0, lng: 0 }}
						zoom={2}
						clickHandler={handleUserGuess}
					/>
				</>
			) : guessIndex === 0 ? (
				<button onClick={() => setGameStart(true)}>click to start</button>
			) : (
				<ScoreBoard />
			)}
		</div>
	);
}

export default Game;
