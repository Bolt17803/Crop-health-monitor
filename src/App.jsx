import{ BrowserRouter, Route, Routes} from "react-router-dom"
import Crop from './components/Crop'
import Newhome from "./components/Newhome"
import About from "./components/About"
import './Styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Crop-health-monitor" element={<Newhome />} />
        <Route exact path="/Crop-health-monitor/Analyze" element={<Crop />} />
        <Route exact path="/Crop-health-monitor/About" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
