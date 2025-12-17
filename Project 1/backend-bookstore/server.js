const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// const cookieParser = require("cookie-parser");


// Load environment variables
dotenv.config();

// Connect MongoDD
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json()); //body parser for json
app.use(express.urlencoded({ extended: true }));


// app.use(cookieParser());

//image access
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use("/item", require("./routes/bookRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/item", require("./routes/itemRoutes"));

// error handling
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

// server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
