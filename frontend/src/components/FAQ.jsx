import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null); // Removed TypeScript syntax

  const faqs = [
    {
      question: "What is ProjectTrack?",
      answer: "ProjectTrack is a comprehensive project management platform designed to streamline collaboration and project tracking. It offers intuitive tools for teams to manage their projects efficiently and effectively."
    },
    {
      question: "How do I create a new project?",
      answer: "Creating a new project is simple. Navigate to your dashboard, click the 'New Project' button, and fill in the essential details like project name, description, and team members. You can always edit these details later."
    },
    {
      question: "Can I collaborate with other team members?",
      answer: "Yes! ProjectTrack is built for collaboration. You can invite team members, assign tasks, share files, and communicate in real-time. Each team member can have different roles and permissions based on their responsibilities."
    },
    {
      question: "What features are included?",
      answer: "ProjectTrack offers a wide range of features including task management, time tracking, file sharing, real-time collaboration, progress tracking, and detailed analytics. We regularly update our platform with new features based on user feedback."
    },
    {
      question: "Is my data secure?",
      answer: "We take security seriously. All data is encrypted both in transit and at rest. We use industry-standard security protocols and regularly conduct security audits to ensure your information remains protected."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-24">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about ProjectTrack
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border-b border-gray-100 last:border-0"
            >
              <button
                className="w-full py-4 text-left flex items-center justify-between focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center pb-8">
          <p className="text-gray-600 text-lg">
            Still have questions?{" "}
            <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;