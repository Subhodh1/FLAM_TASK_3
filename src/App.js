import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Homepage from './Homepage';
import Calender from './Calender';
import AboutPage from './AboutPage';
import HowItWorks from './HowITWorks';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/calender' element={<Calender/>}/>
        <Route path='/about-page' element={<AboutPage/>}/>
        <Route path='/how' element={<HowItWorks/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
