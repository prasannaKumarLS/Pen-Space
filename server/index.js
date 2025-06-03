import express from "express";
import getUsers from "./userApi/getUsers.js";

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/signup", async (req, res) => {
  const userData = req.body;
  try {
    const response = await getUsers(userData);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in /signup:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
