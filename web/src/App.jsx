import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const App = () => {
  return <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/' element={<Dashboard />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App