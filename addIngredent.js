const fs = require('fs');

function addIngredient(name, price) {
    let ingredients = [];
    try {
        const data = fs.readFileSync('ingredients.json', 'utf8');
        ingredients = JSON.parse(data);
    } catch (err) {
        console.log("File not found or empty. Starting fresh.");
    }

    if (nameExists) {
        console.log(`"${newName}" already exists! Not adding.`);
        return; 
    }

    const nameExists = ingredients.some(
        (item) => item.name.toLowerCase() === newName.toLowerCase()
    );

    const newId = ingredients.length > 0 
        ? Math.max(...ingredients.map(item => item.id)) + 1 
        : 1;
    ingredients.push({
        id: newId,
        name: newName,
        price: newPrice
    });

    fs.writeFileSync('ingredients.json', JSON.stringify(ingredients, null, 2));
    console.log(`Added new ingredient: ${newName} (ID: ${newId})`);
}

