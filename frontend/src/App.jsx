import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostJobPage from "./pages/PostJobPage";
import DashboardPage from "./pages/Dashboard";
import JobDetailsPage from "./pages/JobDetails";
import ApplyJobFormPage from "./pages/ApplyJob";
import HRProfilePage from "./pages/HRProfile";
import UserProfilePage from "./pages/UserProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/Landing";
import InterviewPage from "./pages/InterviewPage";
import { ScrollToTop } from "./utils/ScrollToTop";
import JobEditPage from "./pages/JobEditPage";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Header />
        <main className="flex-1">
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/jobs/:jobId/apply" element={<ApplyJobFormPage />} />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
            <Route path="/profile/hr" element={<HRProfilePage />} />
            <Route path="/profile/applicant" element={<UserProfilePage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs" element={<DashboardPage />} />
            <Route path="/jobs/edit/:jobId" element={<JobEditPage />} />
            <Route
              path="/contact"
              element={
                <div className="container mx-auto p-4 text-gray-100">
                  Contact Page (Placeholder)
                </div>
              }
            />
            <Route
              path="/privacy"
              element={
                <div className="container mx-auto p-4 text-gray-100">
                  Privacy Policy (Placeholder)
                </div>
              }
            />
            <Route
              path="/terms"
              element={
                <div className="container mx-auto p-4 text-gray-100">
                  Terms of Service (Placeholder)
                </div>
              }
            />
            <Route
              path="/blog"
              element={
                <div className="container mx-auto p-4 text-gray-100">
                  Blog (Placeholder)
                </div>
              }
            />
            <Route path="/interviews/:roomId" element={<InterviewPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
