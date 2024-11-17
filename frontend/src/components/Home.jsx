import React from 'react';
import { BookOpen, Users, ClipboardCheck, Target, MessageSquare, Shield } from 'lucide-react';

const Home = () => {
  const handleGetStarted = () => {
    window.location.href = '/register';
  };

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 mb-4 text-blue-400" />,
      title: "Topic Management",
      description: "Submit and evaluate project topics with built-in plagiarism checks to ensure originality."
    },
    {
      icon: <Users className="w-8 h-8 mb-4 text-blue-400" />,
      title: "Group Formation",
      description: "Easy digital group formation with invitation system and size limit compliance."
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 mb-4 text-blue-400" />,
      title: "Progress Tracking",
      description: "Monitor milestones, deadlines, and project progress in real-time."
    },
    {
      icon: <Target className="w-8 h-8 mb-4 text-blue-400" />,
      title: "Guide Assignment",
      description: "Streamlined guide allocation and schedule management for each project."
    },
    {
      icon: <MessageSquare className="w-8 h-8 mb-4 text-blue-400" />,
      title: "Communication",
      description: "Built-in tools for seamless feedback between guides and students."
    },
    {
      icon: <Shield className="w-8 h-8 mb-4 text-blue-400" />,
      title: "Quality Control",
      description: "Rigorous evaluation process ensuring project uniqueness and relevance."
    }
  ];

  const roles = [
    {
      title: "Project Coordinator",
      description: "Initiate project seasons and manage overall workflow"
    },
    {
      title: "Students",
      description: "Form groups and submit project proposals"
    },
    {
      title: "Teacher Panel",
      description: "Evaluate and approve project topics"
    },
    {
      title: "Guides",
      description: "Mentor students and manage project schedules"
    },
    {
      title: "HoDs & Supervisors",
      description: "Oversee progress and ensure guideline compliance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section - Added pt-16 to account for fixed navbar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 pt-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to ProjectTrack</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            A comprehensive project management platform designed to streamline and enhance the final
            year project process for college students, faculty, and administration.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Features Grid - Added ID for navigation */}
      <div id="features" className="py-16 bg-white scroll-mt-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roles Section - Added ID for navigation */}
      <div id="roles" className="py-16 bg-gray-50 scroll-mt-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition duration-300">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{role.title}</h3>
                <p className="text-gray-600">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section - Added ID for navigation */}
      <div id="benefits" className="py-16 bg-white scroll-mt-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">Why Choose ProjectTrack?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Centralized Management</h3>
              <p className="text-gray-700">All project information and management tools in one place</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Enhanced Collaboration</h3>
              <p className="text-gray-700">Digital tools for seamless teamwork and communication</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Progress Tracking</h3>
              <p className="text-gray-700">Real-time monitoring and milestone management</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Quality Assurance</h3>
              <p className="text-gray-700">Built-in checks and balances for project excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to streamline your project management?</h2>
          <p className="mb-8 text-lg">Join ProjectTrack today and experience organized, efficient project development.</p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300 shadow-lg"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;