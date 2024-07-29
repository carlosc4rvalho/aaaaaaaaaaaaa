import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Admin from 'pages/Admin'
import Product from 'pages/Product'
import Products from 'pages/Products'
import Anunciar from 'pages/Anunciar'

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/admin', element: <Admin /> },
  { path: '/produto/:id', element: <Product /> },
  { path: '/produtos', element: <Products /> },
  { path: '/anunciar', element: <Anunciar /> },
])

export default function App() {
  return <RouterProvider router={routes} />
}
