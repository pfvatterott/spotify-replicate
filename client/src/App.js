import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.js"
import Callback from "./pages/Callback.js"
import "./pages/index.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/callback" element={<Callback />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
