import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Headers/Navbar";
import Maincomp from "./Components/Home/MainComponent";
import NewNavbar from "./Components/NewNavbar/NewNavbar";
import Cart from "./Components/Cart/Cart";
import SignIn from "./Components/SignupSignin/SignIn";
import Signup from "./Components/SignupSignin/Signup";
import BuyNow from "./Components/BuyNow/BuyNow";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    
    <>
      {/* <Navbar />
      <NewNavbar /> */}
      <Routes>
        <Route path="/" element={<Maincomp />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/getproductsone/:id" element={<Cart />}></Route>
        <Route path="/buynow" element={<BuyNow />}></Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
