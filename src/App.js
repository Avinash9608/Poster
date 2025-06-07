import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
// Import pages
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Pricing from "./components/layout/PricingTable";
import Contact from "./components/layout/Contact";
import About from "./components/layout/About";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Change this to register() to enable PWA
serviceWorkerRegistration.register();
function App() {
  return _jsx(AuthProvider, {
    children: _jsxs(Routes, {
      children: [
        _jsx(Route, { path: "/", element: _jsx(HomePage, {}) }),
        _jsx(Route, { path: "/login", element: _jsx(AuthPage, {}) }),
        _jsx(Route, { path: "/register", element: _jsx(AuthPage, {}) }),
        _jsx(Route, { path: "/pricing", element: _jsx(Pricing, {}) }),
        _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }),
        _jsx(Route, { path: "/about", element: _jsx(About, {}) }),
        _jsx(Route, {
          path: "/dashboard",
          element: _jsxs("div", {
            className: "p-8 text-center",
            children: [
              _jsx("h1", {
                className: "text-3xl font-bold",
                children: "User Dashboard",
              }),
              _jsx("p", { children: "Coming soon..." }),
            ],
          }),
        }),
        _jsx(Route, {
          path: "/admin",
          element: _jsxs("div", {
            className: "p-8 text-center",
            children: [
              _jsx("h1", {
                className: "text-3xl font-bold",
                children: "Admin Dashboard",
              }),
              _jsx("p", { children: "Coming soon..." }),
            ],
          }),
        }),
        _jsx(Route, {
          path: "*",
          element: _jsx("div", {
            className: "p-8 text-center",
            children: _jsx("h1", {
              className: "text-3xl font-bold",
              children: "404 - Page Not Found",
            }),
          }),
        }),
      ],
    }),
  });
}
export default App;
