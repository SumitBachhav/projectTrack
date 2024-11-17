// // Layout.jsx
// import React from 'react';
// import Navbar from './Navbar';
// import Footer from './Footer';

// const Layout = ({ children }) => {
//     return (
//         <div>
//             <Navbar />
//             <main>{children}</main>
//             <Footer />
//         </div>
//     );
// };

// export default Layout;


// Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen"> {/* Ensure layout takes full height */}
            <Navbar />
            <main className="flex-1"> {/* This makes the main content area take available space */}
                {children}
            </main>
            <Footer /> {/* Footer will be pushed to the bottom */}
        </div>
    );
};

export default Layout;
