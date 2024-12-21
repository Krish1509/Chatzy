/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				typing: {
					from: { width: "0%" },
					to: { width: "100%" },
				},
				blink: {
					"50%": { borderColor: "transparent" },
				},
			},
			animation: {
				typing: "typing 3s steps(30, end) forwards, blink .75s step-end infinite",
			},
		},
	},
	plugins: [daisyui],
};
