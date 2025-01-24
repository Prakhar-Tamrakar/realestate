
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Header from "./components/Header";

function App() {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element= {<Home/>}/>
    <Route path="/about" element= {<About/>}/>
    <Route path="/signin" element= {<SignIn/>}/>
    <Route path="/signup" element= {<SignUp/>}/>
    <Route path = "/profile" element= {<Profile/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
