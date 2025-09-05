const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
