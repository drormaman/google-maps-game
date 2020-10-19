import { atom } from "recoil";

export const userGuessesState = atom({
	key: "userGuesses",
	default: []
});
