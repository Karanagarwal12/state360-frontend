import React from "react"

import { Metadata, NextPage } from "next"
import metadataJson from "@/data/metadata.json"

import { HomeView } from "@/views"

interface HomePageProps { }

const HomePage: NextPage<HomePageProps> = () => {
    return (
        <>
            <HomeView />
        </>
    )
}

export default HomePage
