import React from "react";
import person from "../images/person.svg";
import "./mainPageAfterSignUp.css";

const mainPageAfterSignUp = () => {
  return (
    <div>
      <nav class="navbar">
        <div class="navbar-logo">
          <h1>TASKIFY</h1>
        </div>

        <div class="navbar-links">
          <p>sign in</p>
          <img src={person} alt="" />
        </div>
      </nav>

      <main class="main-page">
        <section class="side-bar">
          <h1>Departments</h1>
          <ul>
            <li>Department 1</li>
            <li>Department 2</li>
            <li>Department 3</li>
            <li>Department 4</li>
          </ul>
        </section>

        <section class="departments">
          <div class="dept-card">
            <h3>Department 1</h3>
          </div>
          <div class="dept-card">
            <h3>Department 2</h3>
          </div>
          <div class="dept-card">
            <h3>Department 3</h3>
          </div>
          <div class="dept-card">
            <h3>Department 4</h3>
          </div>
        </section>
      </main>
    </div>
  );
};

export default mainPageAfterSignUp;
