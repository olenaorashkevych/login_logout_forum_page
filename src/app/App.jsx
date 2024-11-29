import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Errorpage from "./pages/errorpage/Errorpage.jsx";
import Layout from "./pages/layout/Layout.jsx";
import Logout from "./pages/Logout/Logout.jsx";
import Logedin from "./pages/Messages/Logedin.jsx";
import Registered from "./pages/Messages/Registered.jsx";


export const UserContext = createContext()

function App() {
  const [user, setuser] = useState(null)

  async function setUserData() {
    const localToken = localStorage.getItem("token") || false;

    if (localToken !== false) {
      // отримамо дані користувача по імейл
      const res = await fetch(`https://673c673c96b8dcd5f3f9d448.mockapi.io/users?token=${localToken}`);
      const data = await res.json();

      if (data != 'Not found') {
        setuser(data[0])
      }

    }
  }

  useEffect(() => {

    setUserData();
  }, [])


  return (
    <UserContext.Provider value={{ user, setuser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='login' element={< Login />} />
            <Route path='register' element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path='logout' element={<Logout />} />
            <Route path='*' element={<Errorpage />} />
            <Route path="logedin" element={<Logedin />} />
            <Route path="registered" element={<Registered />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider >

  );
}

export default App;
