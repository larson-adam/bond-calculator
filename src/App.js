import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import BondCalculator from './components/BondCalculator';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bondcalculator" element={<BondCalculator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
