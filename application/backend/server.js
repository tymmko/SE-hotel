require('dotenv').config();
const express = require('express');
const { neon } = require('@neondatabase/serverless');

const app = express();
const PORT = process.env.PORT || 3000;

const sql = neon(process.env.DATABASE_URL);

app.get('/', async (req, res) => {
	try {
		const result = await sql`SELECT version()`;
		const { version } = result[0];
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end(version);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
