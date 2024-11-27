/**
 * Converts the content to a Blob.
 * @param {string} content - The content to convert to a Blob.
 * @param {string} mimeType - The MIME type of the content.
 * @returns {Blob} The Blob representing the content.
 */
export const contentToBlob = (content: string, mimeType: string): Blob => {
	return new Blob([content], { type: mimeType })
}

/**
 * Downloads a CSV file with the given content.
 * @param {string} csvContent - The content of the CSV file.
 * @param {string} fileName - The desired filename for the downloaded file.
 * @returns {void}
 */
export const downloadCSVFile = (csvContent: string, fileName: string): void => {
	// Convert the content to a Blob
	const blob = contentToBlob(csvContent, "text/csv")

	// Generate a download link for the Blob
	const url = URL.createObjectURL(blob)

	const link = document.createElement("a")

	link.href = url
	link.download = fileName
	link.click()

	// Clean up the URL object
	URL.revokeObjectURL(url)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchWithTimeout(resource: Request | string | URL, options: { timeout?: number } & any) {
	const controller = new AbortController()

	const id = setTimeout(() => controller.abort(), options?.timeout || 6000)

	const response = await fetch(resource, {
		...options,
		signal: controller.signal
	})

	clearTimeout(id)

	return response
}
