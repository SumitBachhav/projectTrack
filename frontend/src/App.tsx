import './App.css'
import CheckScore from './components/student/CheckScore.jsx'
import { Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './components/Register';
import StudentForm from './components/StudentForm';
import StaffForm from './components/StaffForm';
import CoordinatorForm from './components/CoordinatorForm';
import Home from './components/Home';
import RegisterComplete from './components/RegisterComplete';
import Login from './components/Login';
import StudentDashboard from './components/student/StudentDashboard.jsx';
import InsertData from './components/InsertData';
import TestPage from './components/TestPage';
import AbstractComplete from './components/student/AbstractComplete.jsx';
import TopicReview from './components/staff/TopicReview';
import TopicReviewOverview from './components/staff/TopicReviewOverview';
import CheckIfApproved from './components/student/CheckIfApproved';


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
      element: <InsertData />//check for redundancy with /student/checkabstract
    },
    {
      path: '*',
      element: <Navigate to="/" replace />
    },
    {
      path: '/test',
      element: <TestPage />
    },
    {
      path: '/student/abstractSubmissionComplete',
      element: <AbstractComplete />
    },
    {
      path: '/staff/topicReview/:studentId',
      element: <TopicReview />
    },
    {
      path: '/staff/topicReviewOverview',
      element: <TopicReviewOverview />
    },
    {
      path: '/student/checkIfApproved',
      element: <CheckIfApproved />
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