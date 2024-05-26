// // // // AdminPanel.js
// // // import React from "react";
// // // import "./AdminPannel.css"; // Import your CSS file

// // // const AdminPanel = () => {
// // //   return (
// // //     <div className="admin-panel">
// // //       <header className="header">
// // //         <div className="logo-container">
// // //           <img
// // //             src="/path/to/taskify-logo.png"
// // //             alt="Taskify Logo"
// // //             className="logo"
// // //           />
// // //         </div>
// // //         <div className="admin-profile">
// // //           <img
// // //             src="/path/to/admin-avatar.png"
// // //             alt="Admin Avatar"
// // //             className="admin-avatar"
// // //           />
// // //           <div className="logout-option">Logout</div>
// // //         </div>
// // //       </header>
// // //       <aside className="sidebar">
// // //         <ul className="sidebar-options">
// // //           <li>User Management</li>
// // //           <li>All Members</li>
// // //           {/* Add more options here */}
// // //         </ul>
// // //       </aside>
// // //       <main className="main-content">{/* Your main content goes here */}</main>
// // //     </div>
// // //   );
// // // };

// // // export default AdminPanel;
// // import React from "react";
// // import "./AdminPannel.css";

// // const AdminPannel = () => {
// //   return (
// //     <div className="admin-container">
// //       <aside className="sidebar">
// //         <div className="logo">
// //           <h2>Hopital</h2>
// //           <p>Admin Template</p>
// //         </div>
// //         <ul className="menu">
// //           <li>Dashboard</li>
// //           <li>Doctors</li>
// //           <li>Appointment</li>
// //           <li>Total Visit</li>
// //           <li>Patients</li>
// //           <li>Room Allotments</li>
// //           <li>Payments</li>
// //           <li>Email</li>
// //           <li>Chat</li>
// //           <li>Our Staff</li>
// //           <li>Contacts</li>
// //           <li>File Manager</li>
// //           <li>Our Centers</li>
// //           <li>Social</li>
// //           <li>Blog</li>
// //           <li>Special</li>
// //           <li>Statistics</li>
// //         </ul>
// //       </aside>
// //       <main className="main-content">
// //         <header className="header">
// //           <div className="user-info">
// //             <h3>Hi, Welcome back!</h3>
// //             <p>Justo Dashboard</p>
// //           </div>
// //           <div className="user-actions">
// //             <button>ToDo</button>
// //             <button>Settings</button>
// //             <button>Buy this item</button>
// //           </div>
// //         </header>
// //         <section className="statistics">
// //           <div className="stat-box">
// //             <h4>Total Doctors</h4>
// //             <p>1,035</p>
// //             <small>1.79% Last year</small>
// //           </div>
// //           <div className="stat-box">
// //             <h4>Total Pharmacists</h4>
// //             <p>735</p>
// //             <small>6.97% Last year</small>
// //           </div>
// //           <div className="stat-box">
// //             <h4>Total Nurses</h4>
// //             <p>2,652</p>
// //             <small>11.79% Last year</small>
// //           </div>
// //           <div className="stat-box">
// //             <h4>Total Patients</h4>
// //             <p>1,671</p>
// //             <small>5.97% Last year</small>
// //           </div>
// //         </section>
// //         <section className="overview">
// //           <h4>Overview</h4>
// //           <p>Statistics, Predictive Analytics, Big Data Analytics, etc.</p>
// //           <div className="charts">
// //             <div className="chart">
// //               <h5>This Year's Hospital Revenue</h5>
// //               <p>$1,056 $3,098</p>
// //               <small>2023 2024</small>
// //               <div className="chart-img"></div>
// //             </div>
// //             <div className="chart">
// //               <h5>List By Country</h5>
// //               <p>2,356 1,988</p>
// //               <small>2023 2024</small>
// //               <div className="chart-img"></div>
// //             </div>
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // };

// // export default AdminPannel;
// import React from "react";
// import "./AdminPannel.css";

// const AdminPannel = () => {
//   return (
//     <div className="admin-container">
//       <aside className="sidebar">
//         <div className="logo">
//           <h2>Taskify</h2>
//           <p>Admin Dashboard</p>
//         </div>
//         <ul className="menu">
//           <li>Dashboard</li>
//           <li>Total Tasks</li>
//           <li>Completed Tasks</li>
//           <li>Tasks In Progress</li>
//           <li>Completed Tasks Today</li>
//           <li>View All Users</li>
//           <li>Settings</li>
//         </ul>
//       </aside>
//       <main className="main-content">
//         <header className="header">
//           <div className="user-info">
//             <h3>Hi, Welcome Back Admin!</h3>
//             <p>NED UNIVERSITY OF ENGINEERING AND TECHNOLOGY</p>
//           </div>
//           <div className="user-actions">
//             <button>ToDo</button>
//             <button>Settings</button>
//             <button>Log Out</button>
//           </div>
//         </header>
//         <section className="statistics">
//           <div className="stat-box">
//             <h4>Total Tasks</h4>
//             <p>1,035</p>
//             <small>1.79% Increase</small>
//           </div>
//           <div className="stat-box">
//             <h4>Completed Tasks</h4>
//             <p>735</p>
//             <small>6.97% Increase</small>
//           </div>
//           <div className="stat-box">
//             <h4>Task in Progress</h4>
//             <p>120</p>
//             <small>11.79% Increase</small>
//           </div>
//           <div className="stat-box">
//             <h4>Completed Tasks Today</h4>
//             <p>371</p>
//             <small>5.97% Increase</small>
//           </div>
//         </section>
//         <section className="overview">
//           <h4>Overview</h4>
//           <p>Task Statistics and User Management</p>
//           <div className="charts">
//             <div className="chart">
//               <h5>This Month's Task Completion</h5>
//               <p>78% Completed</p>
//               <small>April 2024</small>
//               <div className="chart-img"></div>
//             </div>
//             <div className="chart">
//               <h5> View all Users</h5>
//               <p>Top 5 Users</p>
//               <small>April 2024</small>
//               <div className="chart-img"></div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminPannel;
import React from "react";
import "./AdminPannel.css";

const AdminPannel = () => {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">
          <h2>Taskify</h2>
          <p>Admin Dashboard</p>
        </div>
        <ul className="menu">
          <li>Dashboard</li>
          <li>Total Tasks</li>
          <li>Completed Tasks</li>
          <li>Tasks In Progress</li>
          <li>Completed Tasks Today</li>
          <li>View All Users</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="header">
          <div className="user-info">
            <h3>Hi, Welcome Back Admin!</h3>
            <p>NED UNIVERSITY OF ENGINEERING AND TECHNOLOGY</p>
          </div>
          <div className="user-actions">
            {/* Circle for Admin Account Photo */}
            <div className="admin-photo-circle">
              <img
                src="frontend\src\images\dept-bg-1.jpg" // Path to the admin photo
                className="admin-photo"
              />
            </div>
            {/* End of Circle */}
            <button>Settings</button>
            <button>Log Out</button>
          </div>
        </header>
        <section className="statistics">
          <div className="stat-box">
            <h4>Total Tasks</h4>
            <p>1,035</p>
            <small>1.79% Increase</small>
          </div>
          <div className="stat-box">
            <h4>Completed Tasks</h4>
            <p>735</p>
            <small>6.97% Increase</small>
          </div>
          <div className="stat-box">
            <h4>Task in Progress</h4>
            <p>120</p>
            <small>11.79% Increase</small>
          </div>
          <div className="stat-box">
            <h4>Completed Tasks Today</h4>
            <p>371</p>
            <small>5.97% Increase</small>
          </div>
        </section>
        <section className="overview">
          <h4>Overview</h4>
          <p>Task Statistics and User Management</p>
          <div className="charts">
            <div className="chart">
              <h5>This Month's Task Completion</h5>
              <p>78% Completed</p>
              <small>April 2024</small>
              <div className="chart-img"></div>
            </div>
            <div className="chart">
              <h5> View all Users</h5>
              <p>Top 5 Users</p>
              <small>April 2024</small>
              <div className="chart-img"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPannel;
