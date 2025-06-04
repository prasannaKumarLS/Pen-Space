import express from "express";
import cors from "cors";
import session from "express-session";
import loginRoutes from "./userApi/loginRoutes.js";

// Initialize Express application
const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);
app.use(
  session({
    secret: "donotWasteYourTimeReadingThisSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/login", loginRoutes);

//Middleware authentication Check
function isAuthenticated(req, res, next) {
  req.session.user
    ? next()
    : res.status(401).json({ error: "Unauthorized access" });
}

//Routes
app.get("/home", isAuthenticated, (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
