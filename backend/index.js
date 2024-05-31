// // // import express from "express";
// // // import { PORT, mongoDBURL } from "./config.js";
// // // import mongoose from "mongoose";
// // // import { Task } from "./models/taskModel.js";
// // // import { Organization } from "./models/OrgDetails.js";
// // // import tasksRoute from "./routes/tasksRoute.js";
// // // import OrgDetailsRoute from "./routes/OrgDetailsRoute.js";
// // // import userRoute from "./routes/userRoute.js";

// // // import authRoute from "./routes/authRoute.js";
// // // import cookieParser from "cookie-parser";
// // // import CreateUserRoute from "./routes/CreateUserRoute.js";

// // // import cors from "cors";
// // // import dotenv from "dotenv";
// // // dotenv.config();
// // // const app = express();

// // // //Middleware for parsing request body
// // // app.use(express.json());

// // // app.use(cookieParser());

// // // //Middleware for handling CORS POLICY. Allow all origins
// // // const corsOptions = {
// // //   origin: "http://localhost:3000", // your frontend's origin
// // //   credentials: true, // this allows cookies to be sent from the frontend
// // // };

// // // app.use(cors(corsOptions));
// // // // app.use(cors());

// // // //for http requests
// // // app.get("/", (request, response) => {
// // //   console.log(request);
// // //   return response.status(234).send("Welcome to TASKIFY");
// // // });

// // // app.use((req, res, next) => {
// // //   console.log(req.path, req.method);
// // //   next();
// // // });

// // // app.use("/tasks", tasksRoute);
// // // app.use("/organizations", OrgDetailsRoute);
// // // app.use("/user", userRoute);
// // // app.use("/auth", authRoute);
// // // app.use("/create", CreateUserRoute);

// // // mongoose
// // //   .connect(mongoDBURL)
// // //   .then(() => {
// // //     console.log("App connected to DATABASE");
// // //     app.listen(PORT, () => {
// // //       console.log(`Now listening on port ', ${PORT}`);
// // //     });
// // //   })
// // //   .catch((error) => {
// // //     console.log(error);
// // //   });

// // // console.log("Routes registered: /tasks, /organizations, /user,/create");
// // import express from "express";
// // import { PORT, mongoDBURL } from "./config.js";
// // import mongoose from "mongoose";
// // import { Task } from "./models/taskModel.js";
// // import { Organization } from "./models/OrgDetails.js";
// // import tasksRoute from "./routes/tasksRoute.js";
// // import OrgDetailsRoute from "./routes/OrgDetailsRoute.js";
// // import userRoute from "./routes/userRoute.js";
// // import authRoute from "./routes/authRoute.js";
// // import cookieParser from "cookie-parser";
// // import CreateUserRoute from "./routes/CreateUserRoute.js";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // dotenv.config();

// // const app = express();

// // // Middleware for parsing request body
// // app.use(express.json());
// // app.use(cookieParser());

// // // Middleware for handling CORS POLICY. Allow all origins
// // const corsOptions = {
// //   origin: "http://localhost:3000", // your frontend's origin
// //   credentials: true, // this allows cookies to be sent from the frontend
// // };

// // app.use(cors(corsOptions));

// // // for http requests
// // app.get("/", (req, res) => {
// //   console.log(req);
// //   return res.status(234).send("Welcome to TASKIFY");
// // });

// // app.use((req, res, next) => {
// //   console.log(req.path, req.method);
// //   next();
// // });

// // app.use("/tasks", tasksRoute);
// // app.use("/organizations", OrgDetailsRoute);
// // app.use("/user", userRoute);
// // app.use("/auth", authRoute);
// // app.use("/create", CreateUserRoute);

// // mongoose
// //   .connect(mongoDBURL)
// //   .then(() => {
// //     console.log("App connected to DATABASE");
// //     app
// //       .listen(PORT, () => {
// //         console.log(`Now listening on port ${PORT}`);
// //       })
// //       .on("error", (err) => {
// //         if (err.code === "EADDRINUSE") {
// //           console.error(`Port ${PORT} is already in use.`);
// //           process.exit(1); // Exit the process to avoid hanging state
// //         } else {
// //           console.error("Server error:", err);
// //         }
// //       });
// //   })
// //   .catch((error) => {
// //     console.error("Database connection error:", error);
// //   });

// // console.log("Routes registered: /tasks, /organizations, /user, /create");
// import express from "express";
// import { PORT, mongoDBURL } from "./config.js";
// import mongoose from "mongoose";
// import { Task } from "./models/taskModel.js";
// import { Organization } from "./models/OrgDetails.js";
// import tasksRoute from "./routes/tasksRoute.js";
// import OrgDetailsRoute from "./routes/OrgDetailsRoute.js";
// import userRoute from "./routes/userRoute.js";
// import authRoute from "./routes/authRoute.js";
// import cookieParser from "cookie-parser";
// import CreateUserRoute from "./routes/CreateUserRoute.js";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();

// // Middleware for parsing request body
// app.use(express.json());
// app.use(cookieParser());

// // Middleware for handling CORS POLICY. Allow all origins
// const corsOptions = {
//   origin: "http://localhost:3000", // your frontend's origin
//   credentials: true, // this allows cookies to be sent from the frontend
// };
// app.use(cors(corsOptions));

// // for http requests
// app.get("/", (request, response) => {
//   console.log(request);
//   return response.status(234).send("Welcome to TASKIFY");
// });

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// app.use("/tasks", tasksRoute);
// app.use("/organizations", OrgDetailsRoute);
// app.use("/user", userRoute);
// app.use("/auth", authRoute);
// app.use("/create", CreateUserRoute);

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log("App connected to DATABASE");
//     const port = process.env.PORT || PORT || 5000;
//     app.listen(port, () => {
//       console.log(`Now listening on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// console.log("Routes registered: /tasks, /organizations, /user, /create");
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { PORT, mongoDBURL } from "./config.js";
import tasksRoute from "./routes/tasksRoute.js";
import OrgDetailsRoute from "./routes/OrgDetailsRoute.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import CreateUserRoute from "./routes/CreateUserRoute.js";
// import generateEmailRoute from "./routes/generateEmailRoute.js";
// import generatePasswordRoute from "./routes/generatePasswordRoute.js";

dotenv.config();
const app = express();

app.use(express.json());

//Middleware for handling CORS POLICY. Allow all origins
// const corsOptions = {
//   origin: 'http://localhost:3000', // your frontend's origin
//   credentials: true // this allows cookies to be sent from the frontend
// };


app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/tasks", tasksRoute);
app.use("/organizations", OrgDetailsRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/create", CreateUserRoute);
app.get("/", (req, res) => {
  res.status(200).send("Welcome to TASKIFY");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DATABASE");
    app.listen(PORT, () => {
      console.log(`Now listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

console.log("Routes registered: /tasks, /organizations, /create");
