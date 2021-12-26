const express = require('express');
const app = express();
const cors = require('cors');
const throttle = require('express-throttle');

app.use(cors());

app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] Request de tipus ${req.method} rebut`);
  next();
});

app.get('/api', throttle({ "rate": "10/m" }), (req, res) => {
  const fs = require('fs');
  try {
    const data = fs.readFileSync('data.json', 'utf8');
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => console.log('API escoltant al port 3000'));