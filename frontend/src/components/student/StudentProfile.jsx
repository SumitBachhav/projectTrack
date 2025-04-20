import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// SkillCard component
const SkillCard = ({ skill }) => (
    <div className="bg-gray-50 hover:shadow-md transition p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-lg text-gray-800 mb-1">{skill.domain}</h4>
        <p className="text-sm text-gray-500 mb-2">
            Experience: {skill.experience} year{skill.experience > 1 ? 's' : ''}
        </p>
        <div className="flex flex-wrap gap-2">
            {skill.skills.map((s, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {s}
                </span>
            ))}
        </div>
    </div>
);

// CertificatesList component
const CertificatesList = ({ certificates }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {certificates.length > 0 ? (
            certificates.map((cert, index) => (
                <div
                    key={index}
                    className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm text-sm text-gray-700 font-medium"
                >
                    🎓 {cert}
                </div>
            ))
        ) : (
            <p className="text-sm text-gray-500">No certificates uploaded</p>
        )}
    </div>
);

const StudentProfile = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/student/studentProfile`,
                    { withCredentials: true }
                );
                setStudent(response.data.data);
            } catch (error) {
                console.error("Failed to fetch student profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentProfile();
    }, []);

    const initials = useMemo(() => student?.name?.charAt(0).toUpperCase() || "?", [student]);

    if (loading) {
        return (
            <div className="text-center mt-20 text-lg text-gray-500 animate-pulse">
                Loading profile...
            </div>
        );
    }

    if (!student) {
        return <div className="text-center mt-20 text-red-500">Profile data not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 mt-20">
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-10 border-b pb-6">
                <div className="w-24 h-24 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-4xl font-bold">
                    {initials}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 capitalize">{student.name}</h1>
                    <p className="text-gray-600 text-sm mt-1">{student.email}</p>
                    <p className="text-blue-600 text-sm capitalize font-medium mt-1">{student.role}</p>
                </div>
            </div>

            {/* Profile Info Section */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-1">Basic Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { label: "User ID", value: student.userID },
                        { label: "Year", value: student.year },
                        { label: "Division", value: student.division || "N/A" },
                        { label: "Department", value: student.department },
                    ].map((field, idx) => (
                        <div key={idx}>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                {field.label}
                            </p>
                            <p className="text-lg font-semibold text-gray-800 capitalize">{field.value}</p>
                        </div>
                    ))}
                    <div className="col-span-full">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            GitHub
                        </p>
                        <a
                            href={student.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm font-medium hover:underline break-words"
                        >
                            {student.github}
                        </a>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-1">Skills</h2>
                {student.skills?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {student.skills.map((skill, index) => (
                            <SkillCard key={index} skill={skill} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-sm">No skills listed</p>
                )}
            </div>

            {/* Certificates Section */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-1">Certificates</h2>
                <CertificatesList certificates={student.certificates || []} />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 gap-4">
                <button
                    onClick={() => window.location.href = "/forgot-password"}
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                    Forgot Password
                </button>
                <button
                    onClick={() => window.location.href = "/changePassword"}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default StudentProfile;
