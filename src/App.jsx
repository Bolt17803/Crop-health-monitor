import{ BrowserRouter, Route, Routes} from "react-router-dom";
import Crop from './components/Crop.jsx';
import Newhome from "./components/Newhome.jsx";
import About from "./components/About.jsx";
import Results from "./components/Results.jsx";
import './Styles.css';
import { useEffect, useState } from "react";

function App() {

  const [result,setResult] = useState(null);

  const updateResult = (newResult) => {
    setResult(newResult);
  };

  useEffect(()=>{
    console.log("UPDATED RESULTS:"+result);
  },[result]);

  return (
    // <Newhome />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Newhome />} />
        <Route exact path="/Analyze" element={<Crop setResultFunction={updateResult}/>} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/Results" element={<Results results={result}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
