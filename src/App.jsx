import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import Community from './pages/Community';
import Discover from './pages/Discover';

export default function App() {
  return (
    <Router>
      <AppProvider>
        <div className="mobile-app">
          <div className="device-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/community" element={<Community />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </AppProvider>
    </Router>
  );
}
