import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/StaffPanel"; // Use StaffPanel as the home page for Staff
import About from "./pages/About";
import AdminPanel from "./pages/AdminPanel"; // Import Admin Panel
import Layout from "./components/Layout"; // Import your layout component
import Agent_call from "./pages/Agent_call";

// Utility function to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem("token");

// Utility function to get the user's role
const getUserRole = () => localStorage.getItem("role");

// Protected Route Component to handle authentication and role-based access
const ProtectedRoute = ({ allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  const userRole = getUserRole();
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

// Redirect logged-in users trying to access the login page
const RedirectIfAuthenticated = () => {
  if (isAuthenticated()) {
    const role = getUserRole();
    return <Navigate to={role === "Admin" ? "/admin-panel" : "/home"} />;
  }
  return <Outlet />; // Let them access the page if not authenticated
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<RedirectIfAuthenticated />}>
          <Route path="" element={<Login />} />
        </Route>
      

        {/* Protected Routes with Layout */}
        <Route
          path="/"
          element={isAuthenticated() ? <Layout /> : <Navigate to="/login" />}
        >
          {/* Nested Protected Routes */}
          <Route
            path="home"
            element={<ProtectedRoute allowedRoles={["Staff"]} />}
          >
            <Route path="" element={<Home />} />{" "}
            {/* StaffPanel rendered as Home */}
          </Route>
          <Route
            path="agentcall"
            element={<ProtectedRoute allowedRoles={["Staff"]} />}
          >
            <Route path="" element={<Agent_call/>} />
            {/* StaffPanel rendered as Home */}
          </Route>

          <Route
            path="admin-panel"
            element={<ProtectedRoute allowedRoles={["Admin"]} />}
          >
            <Route path="" element={<AdminPanel />} />
          </Route>
        </Route>

        {/* Fallback for Unknown Routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
