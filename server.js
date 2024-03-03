// server.js

const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
  host: "localhost",
port: 3000,
user: "postgres",
password: "root",
database: "zithara" // Default PostgreSQL port
});

// Function to fetch data from the database
async function fetchData() {
  try {
    // Connect to the database
    const client = await pool.connect();

    // Execute the query to fetch data
    const result = await client.query('SELECT * FROM members');

    // Release the client back to the pool
    client.release();

    // Return the fetched data
    return result.rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = fetchData; // Export the fetchData function
