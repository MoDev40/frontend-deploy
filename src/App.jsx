import { Navigate, Outlet } from "react-router-dom"
import Header from "./components/layout/Header"
import { getToken } from "./lib/cookies"
import { useEffect } from "react"
function App() {
  const token = getToken()
  return (
    <>
      <Header/>
      { !token &&
        <Outlet/>
      }
    </>
  )
}

export default App
