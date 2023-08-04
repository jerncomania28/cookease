import React from 'react';
import { Routes, Route } from 'react-router-dom';

// pages
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import Discover from './pages/Discover';
import Recipes from './pages/Recipes';
import DisplayRecipe from './pages/DisplayRecipe';
import ProtectedRoutes from './components/ProtectedRoutes';

//layout
import AdminLayout from './Layout/AdminLayout';
import AuthLayout from './Layout/AuthLayout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthLayout layoutText="Welcome to CookEase! Unleash your culinary creativity and discover a world of delightful recipes. Sign up now and embark on a flavor-packed journey">
            <SignUp />
          </AuthLayout>
        }
      />
      <Route
        path="/signin"
        element={
          <AuthLayout layoutText="Welcome back to CookEase! Continue your culinary adventures with ease. Sign in now and access your personalized recipe collection.">
            <SignIn />
          </AuthLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AdminLayout>
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          </AdminLayout>
        }
      />
      <Route
        path="/discover"
        element={
          <AdminLayout>
            <ProtectedRoutes>
              <Discover />
            </ProtectedRoutes>
          </AdminLayout>
        }
      />
      <Route
        path="/discover-recipe"
        element={
          <AdminLayout>
            <ProtectedRoutes>
              <DisplayRecipe />
            </ProtectedRoutes>
          </AdminLayout>
        }
      />
      <Route
        path="/my-recipes"
        element={
          <AdminLayout>
            <ProtectedRoutes>
              <Recipes />
            </ProtectedRoutes>
          </AdminLayout>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
