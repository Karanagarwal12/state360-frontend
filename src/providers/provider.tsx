
import React from "react"

// import { UserProvider } from "./user"

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  // if (!mounted) {
  //   return <>{children}</>
  // }

  return (
    // <UserProvider>
      <>{children}</>
    // </UserProvider>
  )
}

export default Providers
