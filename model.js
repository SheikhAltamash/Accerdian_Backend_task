const mysql = require("mysql2/promise");

// Create the connection to the database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "gama",
  password: "1234",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to create the table if it doesn't exist
const createTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS session_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        referrer_name VARCHAR(255) NOT NULL,
        referrer_email VARCHAR(255) NOT NULL,
        refree_name VARCHAR(255) NOT NULL,
        refree_email VARCHAR(255) NOT NULL,
        course VARCHAR(255) NOT NULL
      )
    `;
    await connection.query(query);
    console.log("Table created or already exists");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// Call the function to create the table
createTable();

// Export the connection for use in other files
module.exports = connection;
