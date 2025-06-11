import { useState, useEffect } from 'react'
import axios from 'axios'
import Hiscores from './Hiscores'
import './App.css'

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<string>('users')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users')
      setUsers(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`)
      setUsers(users.filter(user => user._id !== id))
    } catch (err) {
      setError('Failed to delete user')
      console.error('Error deleting user:', err)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Copilot Dev App</h1>
        <p>A full-stack web application with React, TypeScript, Node.js, and Mongoose</p>
      </header>      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#dashboard" className="nav-link">Dashboard</a></li>
          <li>
            <button 
              onClick={() => setCurrentPage('users')} 
              className={`nav-link ${currentPage === 'users' ? 'active' : ''}`}
            >
              Users
            </button>
          </li>          <li>
            <button 
              onClick={() => setCurrentPage('hiscores')} 
              className={`nav-link ${currentPage === 'hiscores' ? 'active' : ''}`}
            >
              Player Stats
            </button>
          </li>
          <li><a href="#analytics" className="nav-link">Analytics</a></li>
          <li><a href="#settings" className="nav-link">Settings</a></li>
        </ul>
      </nav>      <main className="main-content">
        {currentPage === 'users' ? (
          <section className="users-list">
            <h2>Users</h2>
            {error && <div className="error">{error}</div>}
            {loading ? (
              <div className="loading">Loading users...</div>
            ) : (
              <div className="users-grid">
                {users.length === 0 ? (
                  <p className="no-users">No users found.</p>
                ) : (
                  users.map((user) => (
                    <div key={user._id} className="user-card">
                      <h3>{user.name}</h3>
                      <p>{user.email}</p>
                      <p className="date">Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                      <button 
                        onClick={() => deleteUser(user._id)}
                        className="btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        ) : currentPage === 'hiscores' ? (
          <Hiscores />
        ) : (
          <section className="page-placeholder">
            <h2>Page Under Construction</h2>
            <p>This page is not yet implemented.</p>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
