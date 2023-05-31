import{ BrowserRouter, Route, Routes} from "react-router-dom";
import Crop from './components/Crop';
import Newhome from "./components/Newhome";
import About from "./components/About";
import Results from "./components/Results";
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
