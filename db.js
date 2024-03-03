const fetchDataFromServer = require('./server');
const fs = require('fs');

// Function to write data into a JSON file
async function writeDataToFile(data) {
  try {
    // Convert data to JSON format
    const jsonData = JSON.stringify(data, null, 2);

    // Write JSON data to a file named data.json
    fs.writeFileSync('data.json', jsonData);

    console.log('Data written to data.json successfully!');
  } catch (error) {
    console.error('Error writing data to file:', error);
    throw error;
  }
}

// Main function to fetch data and write it to a JSON file
async function main() {
  try {
    // Fetch data from the server
    const fetchedData = await fetchDataFromServer();

    // Write fetched data to a JSON file
    await writeDataToFile(fetchedData);
  } catch (error) {
    console.error('Main error:', error);
  }
}

// Call the main function to start the process
main();
