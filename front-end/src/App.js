import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import RadioBubbles from './pages/Radio'
import CurrentStation from './pages/CurrentStation'
import './App.css'

const App = props => {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/radio-bubbles" element={<RadioBubbles />} />

        <Route path="/current-station" element={<CurrentStation />} />
      </Routes>
    </Router>
  );
}

export default App

