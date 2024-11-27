import type { Metadata } from "next"

/**
 * Base Metadata options to be sharod across apps. Make sure to pass unique title
 * @param param0 Metadata options
 * @returns Metadata configuration object, to be used in Next apps
 */
export const baseMetadata = ({ title, ...rest }: Metadata): Metadata => ({
	description: "Tool created by Front-end Team!",
	other: { "msapplication-TileColor": "#da532c" },
	title: {
		default: (title || "CSV Parsing Tool") as string,
		template: `%s | CSV Parsing Tool`
	},
	...rest
})
