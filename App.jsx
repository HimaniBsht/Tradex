import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { useAuth } from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Stocks from './pages/Stocks';
import Portfolio from './pages/Portfolio';
import Orders from './pages/Orders';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import Learning from './pages/Learning';
import Alerts from './pages/Alerts';

// Show chatbot only when logged in
const AppContent = () => {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/stocks" element={
          <ProtectedRoute><Stocks /></ProtectedRoute>
        } />
        <Route path="/portfolio" element={
          <ProtectedRoute><Portfolio /></ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute><Orders /></ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute><Leaderboard /></ProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute><Admin /></AdminRoute>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/learn" element={
          <ProtectedRoute><Learning /></ProtectedRoute>
        } />
        <Route path="/alerts" element={
          <ProtectedRoute><Alerts /></ProtectedRoute>
        } />
      </Routes>

      {/* Show chatbot on all pages when logged in */}
      {user && <Chatbot />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;