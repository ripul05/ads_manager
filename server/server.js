const express = require("express");
const connectDB = require("./config/database/db");
const routes = require("./routes/index"); // Import the index.js from routes folder

const PORT = 3001;
const app = express();

// Connect to MongoDB
connectDB();


// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Use routes from the index file
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
