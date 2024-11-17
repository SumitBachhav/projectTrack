// Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <div id="contact" className="bg-gray-800 text-white text-center py-6">
            <div className="container mx-auto">
                <p>&copy; 2024 ProjectTrack. All rights reserved.</p>
                <p>
                    Contact us: <a href="mailto:support@projecttrack.com" className="text-blue-400 hover:underline">support@projecttrack.com</a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
