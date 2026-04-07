import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import { AppProvider, useApp } from "./context/AppContext";

function ProtectedRoute({ children }) {
  const { token } = useApp();
  if (!token) return <Navigate to="/auth" />;
  return children;
}

function AppContent() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/chat/:id" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
