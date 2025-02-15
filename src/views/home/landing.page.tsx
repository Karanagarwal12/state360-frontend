import React from "react"
import Header from "./Header"
import MainBody from "./MainBody"
import { Layout } from "@/components/layout"
import Footer from "./Footer"

interface Props {}

const HomeLandingView: React.FC<Props> = () => {
  return (
    <>
      <Layout>
        <Header/>
        <MainBody/>
        <Footer />
      </Layout>
    </>
  )
}

export default HomeLandingView
