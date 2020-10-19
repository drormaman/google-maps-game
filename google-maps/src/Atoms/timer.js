import { atom } from "recoil";

export const timerState = atom({
	key: "timer",
	default: 10
});
