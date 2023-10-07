import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.js"
import Callback from "./pages/Callback.js"
import Profile from "./pages/Profile.js"
import "./pages/index.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/callback" element={<Callback />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
