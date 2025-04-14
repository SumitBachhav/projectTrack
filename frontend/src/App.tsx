import './App.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
// @ts-ignore
import CheckScore from './components/student/CheckScore.jsx'
// @ts-ignore
import RegisterStudent from './components/RegisterStudent';
// @ts-ignore
import Layout from './components/Layout';
// @ts-ignore
import Register from './components/Register';
// @ts-ignore
import StaffForm from './components/staff/StaffForm.jsx';
// @ts-ignore
import CoordinatorForm from './components/CoordinatorForm';
// @ts-ignore
import Home from './components/Home';
// @ts-ignore
import RegisterComplete from './components/RegisterComplete';
// @ts-ignore
import Login from './components/Login';
// @ts-ignore
import StudentDashboard from './components/student/StudentDashboard.jsx';
// @ts-ignore
import InsertData from './components/InsertData';
// @ts-ignore
import TestPage from './components/testPage';
// @ts-ignore
import AbstractComplete from './components/student/AbstractComplete.jsx';
// @ts-ignore
import TopicReview from './components/staff/TopicReview';
// @ts-ignore
import TopicReviewOverview from './components/staff/TopicReviewOverview';
// @ts-ignore
import CheckIfApproved from './components/student/CheckIfApproved';
// @ts-ignore
import ProjectSpecification from './components/student/ProjectSpecification';
// @ts-ignore
import InviteStuents from './components/student/InviteStuents';
// @ts-ignore
import AvailableProjects from './components/student/AvailableProjects';
// @ts-ignore
import AvailableGroups from './components/student/AvailableGroups';
// @ts-ignore
import SubmittedAbstractPage from './components/student/SubmittedAbstractPage';
// @ts-ignore
import GroupMembers from './components/student/GroupMembers';
// @ts-ignore
import SubmitSkill from './components/student/SubmitSkill';
// @ts-ignore
import UploadAbstracts from './components/coordinator/UploadAbstracts';
// @ts-ignore
import StaffDashboard from './components/staff/StaffDashboard';
// @ts-ignore
import RegisterStaff from './components/RegisterStaff';
// @ts-ignore
import CoordinatorDashboard from './components/coordinator/CoordinatorDashboard';
// @ts-ignore
import { AuthProvider } from './context/AuthContext';
// @ts-ignore
import Navbar from './components/Navbar';
// @ts-ignore
import Notifications from './components/Notifications';
// @ts-ignore
import { useAuth } from './context/AuthContext';
// @ts-ignore
import FAQ from './components/FAQ'; // Import FAQ component

import InviteRequestsPage from './components/student/InviteRequestsPage';
import BulkStudentRegister from './components/BulkStudentRegister.js';

// @ts-ignore
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Layout>
          <Routes>

            {/* common */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } 
            />
            <Route path="/faq" element={<FAQ />} /> {/* Add FAQ route */}


            {/* coordinator */}
            <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
            <Route path="/coordinator/uploadAbstracts" element={<UploadAbstracts />} />
            <Route path="/coordinator/bulkRegister" element={<BulkStudentRegister />} />



            {/* staff */}
            <Route path="/register-staff" element={<RegisterStaff />} />
            <Route path="/staff/submitSkills" element={<StaffForm />} />
            <Route path="/staff/topicReview" element={<TopicReview />} />
            <Route path="/staff/topicReviewOverview" element={<TopicReviewOverview />} />
            <Route path="/staff/dashboard" element={<StaffDashboard />} />



            {/* student */}
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/checkabstract" element={<CheckScore />} />
            <Route path="/student/abstractSubmissionComplete" element={<AbstractComplete />} />
            <Route path="/student/checkIfApproved" element={<CheckIfApproved />} />
            <Route path="/student/projectSpecification" element={<ProjectSpecification />} />
            <Route path="/student/inviteStudents" element={<InviteStuents />} />
            <Route path="/student/availableProjects" element={<AvailableProjects />} />
            <Route path="/student/availableGroups" element={<AvailableGroups />} />
            <Route path="/student/submittedAbstracts" element={<SubmittedAbstractPage />} />
            <Route path="/student/groupMembers" element={<GroupMembers />} />
            <Route path="/student/submitSkills" element={<SubmitSkill />} />
            <Route path="/student/inviteRequests" element={<InviteRequestsPage />} />


            {/* not sure */}
            <Route path="/register" element={<Register />} />
            <Route path="/register/coordinator" element={<CoordinatorForm />} />
            <Route path="/register/successful" element={<RegisterComplete />} />
            <Route path="/student/insertdata" element={<InsertData />} />
            <Route path="/test" element={<TestPage />} />

            
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App