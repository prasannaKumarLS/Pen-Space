import express from "express";
import cors from "cors";
import session from "express-session";
import routes from "./src/routes/index.js";
import dotenv from "dotenv";
// Initialize Express application

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
