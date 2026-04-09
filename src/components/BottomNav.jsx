import { Link, useLocation } from 'react-router-dom';
import { Home, Sliders, Globe, Users } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={24} /> },
    { path: '/simulator', label: 'Simulator', icon: <Sliders size={24} /> },
    { path: '/community', label: 'Community', icon: <Users size={24} /> },
    { path: '/discover', label: 'Discover', icon: <Globe size={24} /> },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link key={item.path} to={item.path} className={`nav-item ${isActive ? 'active' : ''}`}>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
