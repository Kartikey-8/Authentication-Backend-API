const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
 
app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);
 
module.exports = app;
