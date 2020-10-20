import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userGuessesState } from "../Atoms/userGuesses";
import { timerState } from "../Atoms/timer";
import { guessIndexState } from "../Atoms/guessIndex";

import {
	GoogleMap,
	LoadScript,
	Marker,
	InfoWindow
} from "@react-google-maps/api";

function Map({ center, zoom, clickHandler }) {
	// const [selected, setSelected] = useState({});

	const mapStyles = {
		height: "80vh",
		width: "80%",
		margin: "10% auto"
	};

	return (
		<div>
			<LoadScript googleMapsApiKey=/* INSERT API KEY HERE */>
				<GoogleMap
					mapContainerStyle={mapStyles}
					zoom={zoom}
					center={center}
					onClick={clickHandler}
					mapTypeId="roadmap"
				/>
				{/* {locations.map(loc => (
					<Marker
						key={loc.OBJECTID_1}
						position={loc.location}
						onClick={() => onSelect(loc)}
					/>
				))} */}
				{/* {selected.location && (
					<InfoWindow
						position={selected.location}
						clickable={true}
						onCloseClick={() => setSelected({})}>
						<p>{selected.MGLSDE_LOC}</p>
					</InfoWindow>
				)} */}
			</LoadScript>
		</div>
	);
}

export default Map;
