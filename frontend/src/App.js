import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/partials/Footer";
import Books from "./pages/Books";

const App = () => {
  return (
    <div className='App'>
      <div>
        <Navbar />
        <main id="main">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/books' element={<Books />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
