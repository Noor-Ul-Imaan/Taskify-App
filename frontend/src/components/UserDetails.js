import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./UserDetails.css";

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    missedTasks: 0,
    averageRating: 0,
  });

  const handleDeleteConfirmation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove them!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${user._id}`, {
        withCredentials: true,
      });
      Swal.fire("Deleted!", "The user has been deleted.", "success");
      navigate("/user-management");
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error!", "There was an error deleting the user.", "error");
    }
  };

  useEffect(() => {
    if (user) {
      const fetchUserTasks = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/tasks/user/${user.username}`
          );
          const userTasks = response.data.data;

          const totalTasks = userTasks.length;
          const completedTasks = userTasks.filter(
            (task) => task.isSubmitted
          ).length;
          const pendingTasks = userTasks.filter(
            (task) => !task.isSubmitted && new Date(task.deadline) >= new Date()
          ).length;
          const missedTasks = userTasks.filter(
            (task) => !task.isSubmitted && new Date(task.deadline) < new Date()
          ).length;

          const ratings = userTasks
            .filter((task) => task.rating !== undefined)
            .map((task) => task.rating);
          const averageRating =
            ratings.length > 0
              ? (
                  ratings.reduce((sum, rating) => sum + rating, 0) /
                  ratings.length
                ).toFixed(2)
              : 0;

          setTaskStats({
            totalTasks,
            completedTasks,
            pendingTasks,
            missedTasks,
            averageRating,
          });
        } catch (error) {
          console.error("Error fetching user tasks:", error);
          Swal.fire(
            "Error!",
            "There was an error fetching the user tasks.",
            "error"
          );
        }
      };

      fetchUserTasks();
    }
  }, [user]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="star full">
            ★
          </span>
        ))}
        {halfStars ? <span className="star half">★</span> : null}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="star empty">
            ★
          </span>
        ))}
      </div>
    );
  };

  // const handleDownloadPDF = () => {
  //   const input = document.getElementById("pdf-content");
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, "PNG", 10, 10);
  //     pdf.save("user-details.pdf");
  //   });
  // };
  const handleDownloadPDF = () => {
    const input = document.getElementById("pdf-content");
    const inputWidth = input.offsetWidth; // Get the width of the content container
    const inputHeight = input.offsetHeight; // Get the height of the content container

    html2canvas(input, {
      width: inputWidth,
      height: inputHeight,
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Define PDF with portrait orientation and A4 size

      // Calculate the aspect ratio of the content and the PDF page
      const aspectRatio = inputWidth / inputHeight;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdfWidth / aspectRatio;

      // Adjust scaling and positioning based on aspect ratio
      const pdfMargin = 10;
      const scaleFactor = (pdfWidth - 2 * pdfMargin) / inputWidth;
      const scaledWidth = inputWidth * scaleFactor;
      const scaledHeight = inputHeight * scaleFactor;
      const xPosition = pdfMargin;
      const yPosition = (pdfHeight - scaledHeight) / 2;

      // Add the image to the PDF with adjusted scaling and positioning
      pdf.addImage(
        imgData,
        "PNG",
        xPosition,
        yPosition,
        scaledWidth,
        scaledHeight
      );

      pdf.save("user-details.pdf");
    });
  };

  return (
    <div className="user-details">
      {user ? (
        <div className="info-container">
          <div id="pdf-content">
            <h1>User Details</h1>
            <div className="info-section">
              <h2>Name</h2>
              <p>
                <strong>First Name:</strong> {user.firstname}
              </p>
              <p>
                <strong>Last Name:</strong> {user.lastname}
              </p>
            </div>
            <div className="info-section">
              <h2>Contact</h2>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
            </div>
            <div className="info-section">
              <h2>Organization</h2>
              <p>
                <strong>Organization Name:</strong> {user.organizationName}
              </p>
              <p>
                <strong>Role:</strong> {user.role.name}
              </p>
            </div>
            <div className="info-section">
              <h2>Task Statistics</h2>
              <p>
                <strong>Total Tasks:</strong> {taskStats.totalTasks}
              </p>
              <p>
                <strong>Completed Tasks:</strong> {taskStats.completedTasks}
              </p>
              <p>
                <strong>Pending Tasks:</strong> {taskStats.pendingTasks}
              </p>
              <p>
                <strong>Missed Tasks:</strong> {taskStats.missedTasks}
              </p>
              <p>
                <strong>Average Rating:</strong> {taskStats.averageRating}
              </p>
              {renderStars(taskStats.averageRating)}
            </div>
          </div>
          <button onClick={handleDeleteConfirmation}>
            Remove from Organization
          </button>
          <button onClick={handleDownloadPDF}>Download as PDF</button>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserDetails;
