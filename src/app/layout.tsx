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
			<head>
				<link href='/favicon-96x96.png' rel='icon' sizes='96x96' type='image/png' />
				<link href='/favicon.svg' rel='icon' type='image/svg+xml' />
				<link href='/favicon.ico' rel='shortcut icon' />
				<link href='/apple-touch-icon.png' rel='apple-touch-icon' sizes='180x180' />
				<meta content='MyWebSite' name='apple-mobile-web-app-title' />
				<link href='/site.webmanifest' rel='manifest' />
			</head>
			<body className={inter.className}>
				<Toaster position='top-right' />
				{children}
			</body>
		</html>
	)
}
