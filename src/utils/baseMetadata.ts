import type { Metadata } from "next"

/**
 * Base Metadata options to be sharod across apps. Make sure to pass unique title
 * @param param0 Metadata options
 * @returns Metadata configuration object, to be used in Next apps
 */
export const baseMetadata = ({ title, ...rest }: Metadata): Metadata => ({
	description: "Tool created by Front-end Team!",
	// icons: [
	// 	{ rel: "icon", url: Favicon.src },
	// 	{
	// 		rel: "icon",
	// 		sizes: "16x16",
	// 		type: "image/png",
	// 		url: Favicon16.src
	// 	},
	// 	{
	// 		rel: "icon",
	// 		sizes: "32x32",
	// 		type: "image/png",
	// 		url: Favicon32.src
	// 	},
	// 	{
	// 		rel: "apple-touch-icon",
	// 		sizes: "180x180",
	// 		url: FaviconApple.src
	// 	},
	// 	{
	// 		color: "#5bbad5",
	// 		rel: "mask-icon",
	// 		url: SafariPinnedTab
	// 	}
	// ],
	other: { "msapplication-TileColor": "#da532c" },
	title: {
		default: (title || "CSV Parsing Tool") as string,
		template: `%s | CSV Parsing Tool`
	},
	...rest
})
