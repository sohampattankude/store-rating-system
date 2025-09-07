import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

// Simple Login Component
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.location.reload();
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Store Rating App - Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', fontSize: '16px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Demo Credentials:</strong><br/>
        Admin: admin@storerating.com | password123!<br/>
        User: alice.johnson@email.com | password123!<br/>
        Store Owner: john.store@electronics.com | password123!
      </div>
    </div>
  );
};

// Simple Dashboard Components
const AdminDashboard = () => (
  <div style={{ padding: '20px' }}>
    <h2>Admin Dashboard</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
        <h3>8</h3>
        <p>Total Users</p>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
        <h3>3</h3>
        <p>Total Stores</p>
      </div>
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
        <h3>15</h3>
        <p>Total Ratings</p>
      </div>
    </div>
    <button onClick={() => localStorage.clear() || window.location.reload()} style={{ padding: '10px 20px', backgroundColor: '#dc004e', color: 'white', border: 'none', borderRadius: '4px' }}>
      Logout
    </button>
  </div>
);

const UserDashboard = () => (
  <div style={{ padding: '20px' }}>
    <h2>User Dashboard</h2>
    <h3>Stores</h3>
    <div style={{ display: 'grid', gap: '15px' }}>
      <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h4>TechWorld Electronics Store</h4>
        <p>456 Business Ave, Commerce City</p>
        <p>Rating: ⭐⭐⭐⭐⭐ (4.5) - 10 reviews</p>
      </div>
      <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h4>Fashion Boutique Store</h4>
        <p>789 Fashion Street, Style Town</p>
        <p>Rating: ⭐⭐⭐⭐ (4.2) - 8 reviews</p>
      </div>
    </div>
    <button onClick={() => localStorage.clear() || window.location.reload()} style={{ padding: '10px 20px', backgroundColor: '#dc004e', color: 'white', border: 'none', borderRadius: '4px', marginTop: '20px' }}>
      Logout
    </button>
  </div>
);

const StoreDashboard = () => (
  <div style={{ padding: '20px' }}>
    <h2>Store Owner Dashboard</h2>
    <div style={{ marginBottom: '20px' }}>
      <h3>TechWorld Electronics Store</h3>
      <p>Average Rating: ⭐⭐⭐⭐⭐ (4.5)</p>
      <p>Total Ratings: 12</p>
    </div>
    <h4>Recent Reviews:</h4>
    <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
      <strong>Alice Johnson</strong> rated ⭐⭐⭐⭐⭐ (5 stars)
    </div>
    <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
      <strong>Bob Wilson</strong> rated ⭐⭐⭐⭐ (4 stars)
    </div>
    <button onClick={() => localStorage.clear() || window.location.reload()} style={{ padding: '10px 20px', backgroundColor: '#dc004e', color: 'white', border: 'none', borderRadius: '4px', marginTop: '20px' }}>
      Logout
    </button>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/admin/*" element={user?.role === 'system_admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/user/*" element={user?.role === 'normal_user' ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/store/*" element={user?.role === 'store_owner' ? <StoreDashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={
          user ? (
            user.role === 'system_admin' ? <Navigate to="/admin/dashboard" /> :
            user.role === 'normal_user' ? <Navigate to="/user/dashboard" /> :
            user.role === 'store_owner' ? <Navigate to="/store/dashboard" /> :
            <Navigate to="/login" />
          ) : <Navigate to="/login" />
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
