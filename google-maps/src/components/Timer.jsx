import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { timerState } from "../Atoms/timer";

function Timer() {
	const [timer, setTimer] = useRecoilState(timerState);

	useEffect(() => {
		const timer = setInterval(timeIsRunning, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);
	// console.log(time);

	function timeIsRunning() {
		setTimer(curr => curr - 1);
	}

	return <div>{timer >= 0 ? timer : "time run out"}</div>;
}

export default Timer;
