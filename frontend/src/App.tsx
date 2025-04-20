import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import "./App.css";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// UI
// @ts-ignore
import Navbar from "./components/Navbar";
// @ts-ignore
import Layout from "./components/Layout";
// @ts-ignore
import Notifications from "./components/Notifications";
import { ToastProvider } from "@/components/ui/use-toast";

// Auth & Common Pages
// @ts-ignore
import Home from "./components/Home";
// @ts-ignore
import Login from "./components/Login";
// @ts-ignore
import Register from "./components/Register";
// @ts-ignore
import RegisterComplete from "./components/RegisterComplete";
// @ts-ignore
import ChangePassword from "./components/ChangePassword";
// @ts-ignore
import FAQ from "./components/FAQ";

// Coordinator
// @ts-ignore
import CoordinatorDashboard from "./components/coordinator/CoordinatorDashboard";
// @ts-ignore
import UploadAbstracts from "./components/coordinator/UploadAbstracts";
// @ts-ignore
import BulkStudentRegister from "./components/coordinator/BulkStudentRegister";
// @ts-ignore
import SendEmailForm from "./components/coordinator/SendEmailForm";
// @ts-ignore
import CoordinatorForm from "./components/CoordinatorForm";

// Staff
// @ts-ignore
import StaffDashboard from "./components/staff/StaffDashboard";
// @ts-ignore
import StaffForm from "./components/staff/StaffForm";
// @ts-ignore
import TopicReview from "./components/staff/TopicReview";
// @ts-ignore
import TopicReviewOverview from "./components/staff/TopicReviewOverview";

// Student
// @ts-ignore
import StudentDashboard from "./components/student/StudentDashboard";
// @ts-ignore
import CheckScore from "./components/student/CheckScore";
// @ts-ignore
import AbstractComplete from "./components/student/AbstractComplete";
// @ts-ignore
import CheckIfApproved from "./components/student/CheckIfApproved";
// @ts-ignore
import ProjectSpecification from "./components/student/ProjectSpecification";
// @ts-ignore
import InviteStuents from "./components/student/InviteStuents";
// @ts-ignore
import AvailableProjects from "./components/student/AvailableProjects";
// @ts-ignore
import AvailableGroups from "./components/student/AvailableGroups";
// @ts-ignore
import SubmittedAbstractPage from "./components/student/SubmittedAbstractPage";
// @ts-ignore
import GroupMembers from "./components/student/GroupMembers";
// @ts-ignore
import SubmitSkill from "./components/student/SubmitSkill";
// @ts-ignore
import InviteRequestsPage from "./components/student/InviteRequestsPage";
// @ts-ignore
import StudentProfile from "./components/student/StudentProfile";
// @ts-ignore
import InsertData from "./components/InsertData";

// Registration
// @ts-ignore
import RegisterStudent from "./components/RegisterStudent";
// @ts-ignore
import RegisterStaff from "./components/RegisterStaff";

// Task Management
// @ts-ignore
import TaskList from "./components/TaskManagement/TaskList";
// @ts-ignore
import TaskHomePage from "./components/TaskManagement/TaskHomePage";
// @ts-ignore
import AssignTask from "./components/TaskManagement/AssignTask";
// @ts-ignore
import TaskDetails from "./components/TaskManagement/TaskDetails";
// @ts-ignore
import CompletedTasks from "./components/TaskManagement/CompletedTasks";
// @ts-ignore
import FormTask from "./components/TaskManagement/FormTask";
// @ts-ignore
import Comments from "./components/TaskManagement/Comments";
// @ts-ignore
import Calendar from "./components/TaskManagement/Calendar";

// Misc
// @ts-ignore
import TestPage from "./components/testPage";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Navbar />
          <Layout>
            <Routes>
              {/* Common */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/coordinator" element={<CoordinatorForm />} />
              <Route path="/register/successful" element={<RegisterComplete />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/changePassword" element={<ChangePassword />} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />

              {/* Coordinator */}
              <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
              <Route path="/coordinator/uploadAbstracts" element={<UploadAbstracts />} />
              <Route path="/coordinator/bulkRegister" element={<BulkStudentRegister />} />
              <Route path="/coordinator/sendEmailForm" element={<SendEmailForm />} />

              {/* Staff */}
              <Route path="/register-staff" element={<RegisterStaff />} />
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/staff/submitSkills" element={<StaffForm />} />
              <Route path="/staff/topicReview" element={<TopicReview />} />
              <Route path="/staff/topicReviewOverview" element={<TopicReviewOverview />} />

              {/* Student */}
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
              <Route path="/student/studentProfile" element={<StudentProfile />} />
              <Route path="/student/insertdata" element={<InsertData />} />

              {/* Task Management */}
              <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
              <Route path="/task-home" element={<ProtectedRoute><TaskHomePage /></ProtectedRoute>} />
              <Route path="/assign-task" element={<ProtectedRoute><AssignTask /></ProtectedRoute>} />
              <Route path="/task" element={<ProtectedRoute><FormTask /></ProtectedRoute>} />
              <Route path="/task/:taskId/comments" element={<Comments />} />
              <Route path="/task/:taskId" element={<TaskDetails />} />
              <Route path="/task-details/:taskId" element={<TaskDetails />} />
              <Route path="/completed-tasks" element={<ProtectedRoute><CompletedTasks /></ProtectedRoute>} />
              <Route path="/calendar" element={<Calendar />} />

              {/* Misc */}
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
