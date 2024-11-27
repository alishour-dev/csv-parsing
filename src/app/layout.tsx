import "./globals.css"

import type { Metadata } from "next"

import { baseMetadata } from "@/utils/baseMetadata"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = baseMetadata({ title: "CSV Parsing Tool" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Toaster position='top-right' />
				{children}
			</body>
		</html>
	)
}
