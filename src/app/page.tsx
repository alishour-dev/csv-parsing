"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectItem } from "@/components/ui/select"
import { contentToBlob, downloadCSVFile, fetchWithTimeout } from "@/utils"
import { cn } from "@/utils/cn"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"

const MAX_ROWS_TO_SHOW = 10

export default function Home() {
	// stores initial imported csv file, and manipulates latest
	const [csvContent, setCSVContent] = useState<string>("")

	// stores preview part of csv file (max `MAX_ROWS_TO_SHOW` rows)
	const [previewRows, setPreviewRows] = useState<string>("")

	// stores custom added header
	const [selectedLabels, setSelectedLabels] = useState<string[]>([])

	// Boolean to check if user wants to add custom header or not
	const [customHeaderOpened, toggleCustomHeader] = useState(false)

	// custom loading boolean
	const [loading, setLoading] = useState<boolean>(false)

	const [file, setFile] = useState<Blob | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]

		if (!file) return

		setFile(file)

		const reader = new FileReader()

		reader.onload = function (event) {
			const fileContent = event.target?.result as string

			setCSVContent(fileContent)
		}

		reader.readAsText(file)
	}

	// Whenever `csvContent` gets changed, we automatically update the previewed content (Table)
	useEffect(() => {
		if (csvContent?.length) {
			const previewContent = csvContent.split("\n").slice(0, MAX_ROWS_TO_SHOW).join("\n")

			setPreviewRows(previewContent)
		}
	}, [csvContent])

	const onClear = () => {
		setFile(null)
		setPreviewRows("")
		setCSVContent("")
	}

	const onCancel = () => {
		setSelectedLabels([])
		toggleCustomHeader(false)
	}

	const onUpdate = () => {
		// Appending newly added custom header to the current csv file
		const updatedContent = selectedLabels.join(",") + "\n" + csvContent

		// Updating Current Preview Table
		setCSVContent(updatedContent)

		// Closing Update button
		onCancel()
	}

	// Sending updated csv content to the server
	const onUpload = useCallback(() => {
		setLoading(true)

		const blob = contentToBlob(csvContent, "text/csv")

		const body = new FormData()

		body.append("file", blob)

		fetchWithTimeout(process.env.NEXT_PUBLIC_SERVER_URL || "", { body, method: "POST" })
			.then((response) => response.json())
			.then(() => {
				setLoading(false)
				toast.success("File Uploaded Successfully!")
			})
			.catch((error) => {
				setLoading(false)
				toast.error(String(error))
			})
	}, [csvContent])

	return (
		<div className='min-h-screen w-full p-3.5'>
			<Header>
				<label
					className={cn(
						"inline-block cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white ring-0 ring-primary transition-all duration-300 ease-in-out hover:bg-opacity-80",
						!!file?.size && "pointer-events-none bg-opacity-0 text-primary-800 ring-2"
					)}
					htmlFor='fileInput'>
					<span className='custom-input-button'>{!file?.size ? "Upload CSV File" : (file as File)?.name}</span>
					<input
						accept='.csv'
						className='hidden'
						disabled={!!file?.size}
						id='fileInput'
						onChange={handleFileChange}
						type='file'
					/>
				</label>

				{!!previewRows?.length && (
					<div className='flex items-center gap-2.5'>
						<Button
							className='w-[117px] bg-blue-700'
							disabled={!csvContent || customHeaderOpened}
							loading={loading}
							onClick={onUpload}>
							Upload File
						</Button>
						<Button
							className='bg-green-600'
							disabled={!csvContent || customHeaderOpened}
							onClick={() => downloadCSVFile(csvContent, "my-new-file")}>
							Download File
						</Button>
						<Button disabled={!previewRows} onClick={onClear} variant='destructive'>
							Clear
						</Button>
					</div>
				)}
			</Header>

			<main
				className={cn(
					"mt-3.5 h-[calc(100vh-110px)] flex-1 overflow-hidden rounded-md border-2 border-primary-800 p-3.5",
					!previewRows && "flex flex-col items-center justify-center text-3xl text-primary-500"
				)}>
				{!previewRows?.length && <>No File Selected</>}

				{!!previewRows?.length && (
					<>
						<Header>
							<h2 className='font-bold text-primary-800'>
								Preview of first {MAX_ROWS_TO_SHOW} Rows:{" "}
								{customHeaderOpened && <span className='text-gray-600'>(Editing Mode)</span>}
							</h2>
							<div className='flex items-center gap-3.5'>
								<Button
									// className='w-32 bg-gray-600'
									disabled={!customHeaderOpened}
									onClick={onCancel}
									variant='outline'>
									Cancel
								</Button>
								<Button
									className='w-32'
									// checking if selectLabels list (filtered from untruthy values) is equal to nb of columns
									disabled={
										customHeaderOpened &&
										selectedLabels?.filter(Boolean).length !== previewRows.split("\n")[0].split(",").length
									}
									onClick={() => (customHeaderOpened ? onUpdate() : toggleCustomHeader(true))}>
									{!customHeaderOpened ? "Add Header" : "Update"}
								</Button>
							</div>
						</Header>
						<div className='mt-4 max-h-[calc(100%-82px)] overflow-y-auto'>
							<table className='h-full w-full border-collapse'>
								<thead>
									<tr>
										{previewRows
											.split("\n")[0]
											.split(",")
											?.map((column, idx) => (
												<th
													className='max-w-[200px] border border-primary-800 bg-primary-50 bg-opacity-50 p-2 text-left text-primary-800'
													key={idx}>
													{customHeaderOpened ? (
														<Select
															onValueChange={(val) => {
																setSelectedLabels((prevLabels) => {
																	const updatedLabels = [...prevLabels]

																	updatedLabels[idx] = val

																	return updatedLabels
																})
															}}
															triggerProps={{ className: "w-[180px]", placeholder: "Select Location" }}
															value={selectedLabels[idx]}>
															{dropdownOptions?.map((v, idx) => (
																<SelectItem key={v + idx} value={v}>
																	{v}
																</SelectItem>
															))}
														</Select>
													) : (
														<span>{column}</span>
													)}
												</th>
											))}
									</tr>
								</thead>
								<tbody>
									{previewRows
										.split("\n")
										// Slicing from (1, MAX_ROWS_TO_SHOW) in a normal case
										// Slicing from (0, MAX_ROWS_TO_SHOW) if custom header was added because previous header is now a row in body
										.slice(customHeaderOpened ? 0 : 1, customHeaderOpened ? MAX_ROWS_TO_SHOW : MAX_ROWS_TO_SHOW + 1)
										?.map((row, rowIndex) => (
											<tr className='max-h-[50px]' key={rowIndex}>
												{row.split(",").map((cell, cellIndex) => (
													<td
														className='max-w-[200px] overflow-x-auto whitespace-nowrap border-[1px] border-primary-800 p-2 text-left text-sm'
														key={cellIndex}>
														<div className='overflow-x-auto'>{cell}</div>
													</td>
												))}
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</>
				)}
			</main>
		</div>
	)
}

const dropdownOptions: string[] = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6"]

const Header = (props: React.HTMLAttributes<HTMLHeadElement>) => (
	<header
		{...props}
		className={cn("flex items-center justify-between rounded-md bg-blue-100 p-3.5", props?.className)}
	/>
)
