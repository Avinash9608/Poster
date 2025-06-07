import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

// Import pages
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Change this to register() to enable PWA
serviceWorkerRegistration.register();
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Pricing from "./components/layout/PricingTable";
import Contact from "./components/layout/Contact";
import About from "./components/layout/About";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* <Navbar /> */}
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />

        {/* Auth routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* User routes */}
        <Route
          path="/dashboard"
          element={
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold">User Dashboard</h1>
              <p>Coming soon...</p>
            </div>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p>Coming soon...</p>
            </div>
          }
        />

        {/* 404 route */}
        <Route
          path="*"
          element={
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
