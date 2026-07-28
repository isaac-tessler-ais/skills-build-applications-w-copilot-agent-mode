import { NavLink, Navigate, Route, Routes } from 'react-router-dom'

import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { apiBaseUrl } from './api'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

const navigation = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/users" className="brand text-decoration-none">
          <img src={octofitLogo} alt="Octofit Tracker" />
          <span>Octofit Tracker</span>
        </NavLink>
        <nav className="app-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink key={item.path} to={item.path} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <div className="api-banner">
          <span>API base</span>
          <code>{apiBaseUrl}</code>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
