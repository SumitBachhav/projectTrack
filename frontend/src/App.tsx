import './App.css'
import CheckScore from './components/CheckScore.jsx'
import { Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './components/Register';
import StudentForm from './components/StudentForm';
import StaffForm from './components/StaffForm';
import CoordinatorForm from './components/CoordinatorForm';
import Home from './components/Home';
import RegisterComplete from './components/RegisterComplete';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import InsertData from './components/InsertData';
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/register/student',
      element: <StudentForm />
    },
    {
      path: '/register/staff',
      element: <StaffForm />
    },
    {
      path: '/register/coordinator',
      element: <CoordinatorForm />
    },
    {
      path: '/register/successful',
      element: <RegisterComplete />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/student/dashboard',
      element: <StudentDashboard />
    },
    {
      path: '/student/checkabstract',
      element: <CheckScore />
    },
    {
      path: '/student/insertdata',
      element: <InsertData />
    },
    {
      path: '*',
      element: <Navigate to="/" replace />
    }
  ])
  

  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>

  )
}

export default App
{/* <CheckScore/> */}