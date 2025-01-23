
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element= {<Home/>}/>
    <Route path="/about" element= {<About/>}/>
    <Route path="/signin" element= {<SignIn/>}/>
    <Route path="/signup" element= {<SignUp/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
