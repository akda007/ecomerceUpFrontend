import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthenticationContext'
import Login from './pages/Login'
import Register from './pages/Register'
import { ProtectedRoute } from './routes/ProtectedRoute'
import Home from './pages/Home'
import Kart from './pages/Kart'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import RegisterProducts from './pages/RegisterProducts'
import RegisterSupplier from './pages/RegisterSupplier'
import ListSuppliers from './pages/ListSuppliers'
import EditProduct from './pages/EditProduct'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ToastContainer />  
      <BrowserRouter>
        <AuthProvider>
          <Routes>
    
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>

            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home />}/>
              <Route path='/kart' element={<Kart />}/>
              <Route path='/create-product' element={<RegisterProducts />}/>
              <Route path='/register-supplier' element={<RegisterSupplier />}/>
              <Route path='/list-supplier' element={<ListSuppliers />}/>
              <Route path='/edit-product' element={<EditProduct />}/>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  </StrictMode>,
)
