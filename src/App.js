import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Homepage from './Homepage';
import Calender from './Calender';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/calender' element={<Calender/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
