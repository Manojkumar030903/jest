import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

app.post('/auth/login', (req, res) => {
  const { username } = req.body;

  const user = users.find((u) => u.username === username);

  if (user) {
    res.json({
      message: 'Login successful',
      token: 'fake-jwt-token',
      user: { id: user.id, username: user.username },
    });
  } else {
    res.status(401).json({ message: 'Invalid username' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
