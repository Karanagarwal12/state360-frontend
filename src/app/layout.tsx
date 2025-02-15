import React from "react"
import { Metadata } from "next"
import "@/styles/globals.css"



const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <body className="min-h-screen">{children}</body>
    </html>
)

export default RootLayout
