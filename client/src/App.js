import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.js"
import "./pages/index.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Welcome />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
