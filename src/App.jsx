import{ BrowserRouter, Route, Routes} from "react-router-dom"
import Crop from './components/Crop'
import Newhome from "./components/Newhome"
import './Styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Newhome />} />
        <Route exact path="/Analyze" element={<Crop />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
