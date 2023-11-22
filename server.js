const express = require("express");
const next = require("next");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const dotenv = require("dotenv");
const User = require("./user");
const Todo = require("./todo");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  server.use(express.json());

  server.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Unable to register user' });
    }
  });

  server.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    res.json({ token });
  });

  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  server.post('/api/tasks/add', authenticateToken, async (req, res) => {
    try {
      const { title, description } = req.body;
      const author = req.user.username;
      const newTodo = new Todo({ title, description, author });
      await newTodo.save();
      res.status(201).json({ message: 'Todo added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to add todo' });
    }
  });
  
  server.get('/api/tasks', authenticateToken, async (req, res) => {
    try {
      const author = req.user.username;
      const todos = await Todo.find({ author });
      res.json(todos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Unable to fetch todos' });
    }
  });
  
  server.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
    try {
      const author = req.user.username;
      const { id } = req.params;
      const todo = await Todo.findOne({ _id: id, author });
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found or unauthorized' });
      }
      await Todo.findByIdAndDelete(id);
      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete todo' });
    }
  });
  
  server.put('/api/tasks/:id/complete', authenticateToken, async (req, res) => {
    try {
      const author = req.user.username;
      const { id } = req.params;
      const todo = await Todo.findOne({ _id: id, author });
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found or unauthorized' });
      }
      todo.completed = !todo.completed;
      if (todo.completed) {
        todo.dateCompleted = Date.now();
      } else {
        todo.dateCompleted = null;
      }
      await todo.save();
      res.json({ message: 'Todo status updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to update todo status' });
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
