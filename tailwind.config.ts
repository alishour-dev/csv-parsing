//#region Import
import type { Config } from "tailwindcss"

import twFonts from "@tailwindcss/forms"
import twTopography from "@tailwindcss/typography"
import twAnimate from "tailwindcss-animate"
import twPresets from "tw-presets"
//#endregion

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	darkMode: ["class"],
	plugins: [twAnimate, twPresets, twTopography, twFonts, ],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: { "2xl": "1400px" },
		},
		extend: {
			colors: {
				primary: {
					50: "#C3E5F7",
					100: "#B5DEF5",
					200: "#A6D7F2",
					300: "#97D1F0",
					400: "#88CAEE",
					500: "#79C4EC",
					600: "#4CB0E6",
					700: "#2EA3E2",
					800: "#1D92D1",
					900: "#197DB3",
					DEFAULT: "#6ABDEA",
				},
			},
			screens: {
				"2xs": "400px",
				xs: "576px",
			},
		},
	},
}

export default config