const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid URL parameter' });
  }

  const uniqueNumbers = new Set();

  try {
    const requests = urls.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout: 500 });
        const numbers = response.data.numbers;

        if (Array.isArray(numbers)) {
          numbers.forEach((num) => uniqueNumbers.add(num));
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
      }
    });

    await Promise.all(requests);

    const mergedNumbers = Array.from(uniqueNumbers).sort((a, b) => a - b);

    return res.json({ numbers: mergedNumbers });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
