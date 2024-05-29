import React, { useState } from "react";
import axios from "axios";
import "./OrgSignUp.css"; // Import CSS styles
import logo from "./logo.png"; // Import logo image (adjust the path as needed)
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3000/signup", {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            alert("User already exists");
          } else if (res.data == "notexist") {
            //if user doesnt exist redirect it to home
            history("/OrganizationDetails", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login">
      <div className="gradient-background">
        <div className="container">
          <div className="header">
            <img src={logo} alt="Taskify Logo" />
          </div>
          <div className="content">
            <h1>Signup</h1>
            <form action="POST">
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
                {/* </div>
              {/* <div className="input-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                /> */}
              </div>
              <Link to="/OrganizationDetails">
                <button type="submit" onClick={submit}>
                  Sign Up
                </button>
              </Link>
            </form>
          </div>
          <div className="footer">
            <span>
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;






























// import React, { useState } from "react";
// import axios from "axios";
// import "./OrgSignUp.css"; // Import CSS styles
// import logo from "./logo.png"; // Import logo image (adjust the path as needed)
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const history = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       await axios
//         .post("http://localhost:3000/signup", {
//           email,
//           password,
//         })
//         .then((res) => {
//           if (res.data == "exist") {
//             alert("User already exists");
//           } else if (res.data == "notexist") {
//             //if user doesnt exist redirect it to home
//             history("/OrganizationDetails", { state: { id: email } });
//           }
//         })
//         .catch((e) => {
//           alert("wrong details");
//           console.log(e);
//         });
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   return (
//     <div className="login">
//       <div className="gradient-background">
//         <div className="container">
//           <div className="header">
//             <img src={logo} alt="Taskify Logo" />
//           </div>
//           <div className="content">
//             <h1>Signup</h1>
//             <form action="POST">
//               <div className="input-field">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                   }}
//                   placeholder="Email"
//                 />
//               </div>
//               <div className="input-field">
//                 <input
//                   type="password"
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                   }}
//                   placeholder="Password"
//                 />
//                 {/* </div>
//               {/* <div className="input-field">
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   placeholder="Confirm password"
//                 /> */}
//               </div>
//               <Link to="/OrganizationDetails">
//                 <button type="submit" onClick={submit}>
//                   Sign Up
//                 </button>
//               </Link>
//             </form>
//           </div>
//           <div className="footer">
//             <span>
//               This site is protected by reCAPTCHA and the Google Privacy Policy
//               and Terms of Service apply.
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
