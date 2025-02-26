import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import router from './router/route.js';
import User from './models/user.js';

// Load environment variables
config();

const app = express();


/** App middlewares */
app.use(morgan('tiny'));
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend (adjust if necessary)
  credentials: true, // Allow sending cookies
}));
app.use(express.json());

/** MongoDB Connection */
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/** Quiz Schema */
const quizSchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password if using Gmail
  },
});

/** Routes */

// Main API routes
app.use('/api', router);

/** Home route */
app.get('/', (req, res) => {
  res.json("Server is running");
});

/** Quiz Routes */

// Create a quiz
app.post('/api/quizzes', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).send('Quiz created');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all quizzes
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get a quiz by ID
app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching quiz', error: err });
  }
});

/** Authentication Routes */

// User signup
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });
    res.status(201).json({ status: "Success", message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User login

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password inputs
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user found with this email" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create a JWT token with user data (can include additional information if necessary)
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expiration set to 1 day
    );

    // Send success response with the token
    res.status(200).json({
      status: "Success",
      token,
      username: user.username,
      email: user.email // You may want to send the email as well if required
    });
  } catch (err) {
    // Handle server errors
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});


// Forgot Password Route
app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const token = Math.random().toString(36).substr(2);
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Reset",
    text: `You requested a password reset. Click the link to reset: http://localhost:3000/reset-password/${token}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return res.status(500).json({ error: "Email not sent" });
    res.json({ message: "Password reset email sent" });
  });
});

// Reset Password Route
app.post("/api/reset-password/:token", async (req, res) => {
  const { password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ error: "Token is invalid or expired" });

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ message: "Password has been reset" });
});



// Update Profile Endpoint
app.put('/api/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

/** Start the server */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
