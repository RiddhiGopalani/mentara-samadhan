const express = require('express');
const app = express();
const port = 3000; // you can change if needed

app.get('/', (req, res) => {
  res.send("Hello World!! <br> We are Riddhi and Sakshi");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
