import './App.css';
import Home from './webpages/Home';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import ViewCandidates from './webpages/ViewCandidates';
import AddCandidate from './webpages/AddCandidate';
import WinnerCandidate from './webpages/WinnerCandidate';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/view' element={<ViewCandidates/>}/>
      <Route path='/add' element={<AddCandidate/>}/>
      <Route path='/winner' element={<WinnerCandidate/>}/>
    </Routes>
   </Router>
  );
}

export default App;
