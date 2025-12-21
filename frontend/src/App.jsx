import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/login";
import Menu from "./pages/Menu"
import Register from "./pages/Register";




function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/menu' element={<Menu />}/>
      </Routes>

    </div>
  )
}

export default App