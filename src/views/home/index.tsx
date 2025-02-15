
import { Provider } from "@/providers"

import HomeLandingView from "./landing.page"
import metadataJson from "@/data/metadata.json"

import { Metadata } from "next";

const HomeView = () => {
  return (
    <Provider>
      <HomeLandingView />
    </Provider>
  )
}

export default HomeView
