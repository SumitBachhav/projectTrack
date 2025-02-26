import './App.css'
import CheckScore from './components/student/CheckScore.jsx'
import RegisterStudent from './components/RegisterStudent';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './components/Register';
import StaffForm from './components/staff/StaffForm.jsx';
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
import ProjectSpecification from './components/student/ProjectSpecification';
import InviteStuents from './components/student/InviteStuents';
import AvailableProjects from './components/student/AvailableProjects';
import AvailableGroups from './components/student/AvailableGroups';
import InvitesAndRequests from './components/student/InvitesAndRequests';
import SubmittedAbstractPage from './components/student/SubmittedAbstractPage';
import GroupMembers from './components/student/GroupMembers';
import SubmitSkill from './components/student/SubmitSkill';
import UploadAbstracts from './components/coordinator/UploadAbstracts';
import StaffDashboard from './components/staff/StaffDashboard';
import RegisterStaff from './components/RegisterStaff';
import CoordinatorDashboard from './components/coordinator/CoordinatorDashboard';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import { useAuth } from './context/AuthContext';

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
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/staff/submitSkills" element={<StaffForm />} />
            <Route path="/register/coordinator" element={<CoordinatorForm />} />
            <Route path="/register/successful" element={<RegisterComplete />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/checkabstract" element={<CheckScore />} />
            <Route path="/student/insertdata" element={<InsertData />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/student/abstractSubmissionComplete" element={<AbstractComplete />} />
            <Route path="/staff/topicReview" element={<TopicReview />} />
            <Route path="/staff/topicReviewOverview" element={<TopicReviewOverview />} />
            <Route path="/student/checkIfApproved" element={<CheckIfApproved />} />
            <Route path="/student/projectSpecification" element={<ProjectSpecification />} />
            <Route path="/student/inviteStudents" element={<InviteStuents />} />
            <Route path="/student/availableProjects" element={<AvailableProjects />} />
            <Route path="/student/availableGroups" element={<AvailableGroups />} />
            <Route path="/student/invitesAndRequests" element={<InvitesAndRequests />} />
            <Route path="/student/submittedAbstracts" element={<SubmittedAbstractPage />} />
            <Route path="/student/groupMembers" element={<GroupMembers />} />
            <Route path="/student/submitSkills" element={<SubmitSkill />} />
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/coordinator/uploadAbstracts" element={<UploadAbstracts />} />
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/register-staff" element={<RegisterStaff />} />
            <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App