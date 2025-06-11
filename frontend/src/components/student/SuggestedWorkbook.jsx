import React from 'react';

// install dependencies
// npm install jspdf jspdf-autotable xlsx

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const SuggestedWorkbook = () => {
    const tasks = [
        {
            title: "Design Login Page",
            description: "Create login form UI using Tailwind CSS",
            milestone: "Frontend Setup",
            deadline: "2025-06-15",
            assignedTo: { name: "Aayush" },
            suggestionFromGuide: "Use React Hook Form for validation"
        },
        {
            title: "Implement Login Logic",
            description: "Handle authentication with JWT",
            milestone: "Frontend Setup",
            deadline: "2025-06-17",
            assignedTo: { name: "Raj" },
            suggestionFromGuide: "Use axios interceptors for token"
        },
        {
            title: "Setup Database Schema",
            description: "Create MongoDB schemas for users and groups",
            milestone: "Backend Setup",
            deadline: "2025-06-20",
            assignedTo: { name: "Aayush" },
            suggestionFromGuide: "Normalize collections and use Mongoose plugins"
        },
        {
            title: "API for Group Creation",
            description: "Develop REST API to handle group creation",
            milestone: "Backend Setup",
            deadline: "2025-06-22",
            assignedTo: { name: "Raj" },
            suggestionFromGuide: "Ensure input validation using Joi"
        },
        {
            title: "Connect Frontend to Backend",
            description: "Integrate login page with backend API",
            milestone: "Integration Phase",
            deadline: "2025-06-25",
            assignedTo: { name: "Aayush" },
            suggestionFromGuide: "Use environment variables for API base URL"
        }
    ];

    const groupedTasks = tasks.reduce((acc, task) => {
        const milestone = task.milestone || "Uncategorized";
        if (!acc[milestone]) acc[milestone] = [];
        acc[milestone].push(task);
        return acc;
    }, {});

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Suggested Workbook", 14, 16);

        const rows = tasks.map(task => [
            task.milestone,
            task.title,
            task.description,
            task.deadline,
            task.assignedTo?.name || "N/A",
            task.suggestionFromGuide || "—"
        ]);

        autoTable(doc, {
            head: [["Milestone", "Task Title", "Description", "Deadline", "Assigned To", "Guide Suggestion"]],
            body: rows,
            startY: 20,
        });

        doc.save("Suggested_Workbook.pdf");
    };

    const handleDownloadExcel = () => {
        const worksheetData = tasks.map(task => ({
            Milestone: task.milestone,
            "Task Title": task.title,
            Description: task.description,
            Deadline: task.deadline,
            "Assigned To": task.assignedTo?.name || "N/A",
            "Guide Suggestion": task.suggestionFromGuide || "—"
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Workbook");

        XLSX.writeFile(workbook, "Suggested_Workbook.xlsx");
    };

    return (
        <div className="max-w-6xl mx-auto mt-14 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-700">📒 Suggested Workbook</h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleDownloadPDF}
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Download PDF
                    </button>
                    <button
                        onClick={handleDownloadExcel}
                        className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Download Excel
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-300">
                    <thead className="bg-blue-100 text-blue-800">
                        <tr>
                            <th className="px-4 py-2 border">Milestone</th>
                            <th className="px-4 py-2 border">Task Title</th>
                            <th className="px-4 py-2 border">Description</th>
                            <th className="px-4 py-2 border">Deadline</th>
                            <th className="px-4 py-2 border">Assigned To</th>
                            <th className="px-4 py-2 border">Guide Suggestion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(groupedTasks).map(([milestone, tasksInMilestone], idx) =>
                            tasksInMilestone.map((task, taskIdx) => (
                                <tr key={`${idx}-${taskIdx}`} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">
                                        {taskIdx === 0 ? (
                                            <span className="font-semibold text-gray-700">{milestone}</span>
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border">{task.title}</td>
                                    <td className="px-4 py-2 border">{task.description}</td>
                                    <td className="px-4 py-2 border">{task.deadline}</td>
                                    <td className="px-4 py-2 border">{task.assignedTo?.name || 'N/A'}</td>
                                    <td className="px-4 py-2 border">{task.suggestionFromGuide || '—'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuggestedWorkbook;
