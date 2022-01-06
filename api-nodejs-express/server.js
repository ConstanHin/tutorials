const express = require('express');
const app = express();
const cors = require('cors');
const throttle = require('express-throttle');
port = process.env.PORT || 3001;

app.use(cors());

app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] Request de tipus ${req.method} rebut`);
  next();
});

app.get('/api', throttle({ "rate": "2/s" }), (req, res) => {
  const fs = require('fs');
  try {
    const data = fs.readFileSync('data.json', 'utf8');
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => console.log('API escoltant al port:', port));