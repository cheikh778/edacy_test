import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

// Composants
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductForm from './pages/ProductForm';

// Composant pour les routes protégées
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/products" 
              element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/products/:id" 
              element={
                <PrivateRoute>
                  <ProductDetail />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/products/new" 
              element={
                <PrivateRoute>
                  <ProductForm />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/products/edit/:id" 
              element={
                <PrivateRoute>
                  <ProductForm />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/products" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
