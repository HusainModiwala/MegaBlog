import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('kl');
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          console.log('olk');
          dispatch(login(user));
        } else {
          console.log('l');
          dispatch(logout());
        }
      })
      .finally(() => {dispatch(logout());setLoading(false)});
  }, []);

  return loading ? null : (
  <div className="min-h-screen flex flex-wrap justify-content-between bg-gray-400">
    <div className="w-full block">
      <Header/>
      <main>
        {/* <Outlet/> */}
      </main>
      <Footer/>
    </div>
  </div>
  );
}

export default App;
