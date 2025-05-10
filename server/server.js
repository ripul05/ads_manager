const express = require("express");
const connectDB = require("./config/database/db");
const routes = require("./routes/index"); // Import the index.js from routes folder
const cors = require('cors');

const PORT = 3001;
const app = express();

app.use(cors({
  origin: ['http://localhost:3000','https://ads-managerfrontend.onrender.com'],
  credentials: true,
}));


// Connect to MongoDB
connectDB();


// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Use routes from the index file
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
