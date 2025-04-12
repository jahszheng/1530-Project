//  assuming that we have a functioning database
const fs = require('fs');


// 1. Read and parse the JSON file
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    try {
      const jsonData = JSON.parse(data);
      
      // 2. Get the array from the JSON (replace 'items' with your key)
      const arrayFromJson = jsonData.items;
      
      // 3. Convert the array to a Set
      const setFromArray = new Set(arrayFromJson);
      
      console.log(setFromArray);
      // You can convert back to array if needed: [...setFromArray]
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });

const mySet = new Set()
// this is a subset
function isSubset(subset, superset) {
    for (const item of subset) {
      if (!superset.has(item)) return false;
    }
    return true;
  }


// Get input from an HTML input field
inputElement = document.getElementById('userInput');
userInput = inputElement.value;

// Process the input into a Set
processInputToSet = (input) => {
  // Split by either commas or spaces (or combinations)
  const items = input.split(/[, ]+/).filter(item => item.trim() !== '');
  return new Set(items);
};

const resultSet = processInputToSet(userInput);
