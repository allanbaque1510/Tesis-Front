import React,{Suspense } from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import {directorioLogin,directorioRutasProtegidas} from './Directorio'; 
import Loading from './components/Loading';
import './resource/css/main.css'
import Contenedor from './pages/Contenedor';
import Cargando from './components/Cargando';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
    <Contenedor>

        <Routes>
        {directorioLogin().map(route => (
            
            <Route
              key={route.key}
              path={route.path}
              element={
                <Suspense fallback={<Loading/>}>
                  <route.element />
                </Suspense>
              }
            />
          ))}
          <Route element={<ProtectedRoute />}>
          {directorioRutasProtegidas().map(route => (
            <Route
              key={route.key}
              path={route.path}
              element={
                <Suspense fallback={<Loading/>}>
                  <route.element />
                </Suspense>
              }
            />
          ))}
          </Route>
        </Routes>
    </Contenedor>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
