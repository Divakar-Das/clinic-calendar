import { Route,Routes } from "react-router-dom"
import Login from "../validation/Login"
import Calendar from "../pages/Calendar"

const RouterFile = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Calendar/>} />
      </Routes>
    </>
  )
}

export default RouterFile
