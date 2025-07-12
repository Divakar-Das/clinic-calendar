import { Route,Routes } from "react-router-dom"
import Login from "../validation/Login"
import CalendarComponent from "../pages/CalendarComponent"

const RouterFile = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<CalendarComponent/>} />
      </Routes>
    </>
  )
}

export default RouterFile
