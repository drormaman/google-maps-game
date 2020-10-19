import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { countriesState } from "../Atoms/countries";
import { userGuessesState } from "../Atoms/userGuesses";

function ScoreBoard() {
	const [finalScore, setFinalScore] = useState(0);

	const countries = useRecoilValue(countriesState);
	const userGuesses = useRecoilValue(userGuessesState);

	useEffect(() => {
		calculateFinalScore();
	}, []);

	function calculateFinalScore() {
		console.log(userGuesses);
		const eachCountryResult = countries.map((country, i) => {
			const score = Math.floor(
				1000 /
					getDistanceFromLatLngInKm(
						...country.latlng,
						userGuesses[i].latLng.lat,
						userGuesses[i].latLng.lng
					)
				// *userGuesses[i].timeLeft
			);
			if (isNaN(score)) return 0;
			return score;
		});
		const sumScore = eachCountryResult.reduce((sum, result) => (sum += result));
		setFinalScore(sumScore);
		console.log(eachCountryResult);
		console.log(sumScore);
	}

	return <div>{finalScore}</div>;
}

export default ScoreBoard;

function getDistanceFromLatLngInKm(lat1, lng1, lat2, lng2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1); // deg2rad below
	var dLng = deg2rad(lng2 - lng1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}
