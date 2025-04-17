// Initialize variables properly
let ingredname, price, addIngredentButton;
const items = JSON.parse(localStorage.getItem('Ingredents')) || [];
const recpi = JSON.parse(localStorage.getItem('recipes')) || [];
// Initialize URL object correctly (if you're using it)
const ingredsUrl = "http://localhost:8000/Ingredents";
const recipUrl = "http://localhost:8000/recipes";

function initializeElements() {
    ingredname = document.getElementById("insert_new_ingredient_text_input");
    price = document.getElementById("insert_new_ingredient_price_text_input");
    addIngredentButton = document.getElementById("add_new_ingredent");

    reci = document.getElementById("insert_new_recipe_text_input");
    ingredent_list = document.getElementById("insert_new_ingredients_text_input");
    directions = document.getElementById("insert_new_directions_textarea");
    description = document.getElementById("insert_new_description_textarea");
    buttonRecp = document.getElementById("add_new_sp_button");
}

function add_event_listeners() {
    // Make sure elements are initialized first
    initializeElements();
    addIngredentButton.addEventListener("click", add_ingredints);
    buttonRecp.addEventListener("click", add_Rec);
}

async function add_ingredints() {
    console.log("added ingredient please");
    
    // Get the values from input fields
    const ingred = ingredname.value;
    const expense = price.value;

    // Validate inputs
    if (!ingred || !expense) {
        alert("Please enter both name and price");
        return;
    }

    let new_ingred = {
        "name": ingred,
        "price": expense   
    };

    try {
        // Check for duplicates in localStorage
        const existingNames = new Set(
            items.map(item => item.name.toLowerCase())
        );
        
        if (existingNames.has(ingred.toLowerCase())) {
            alert(`"${ingred}" already exists!`);
            return;
        }

        // Add to local storage
        items.push(new_ingred);
        localStorage.setItem('Ingredents', JSON.stringify(items));

        // If you're using a server endpoint
        try {
            const response = await fetch(ingredsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(new_ingred)
            });
            
            console.log("Successfully added to server");
        } catch (error) {
            console.error("Error sending to server:", error);
        }

        // Clear inputs
        ingredname.value = "";
        price.value = "";

        alert("Ingredient added successfully!");
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding the ingredient");
    }
}

function processIngredients(input) {
    return input
      .toLowerCase()
      .trim() // Remove whitespace from ends
      .split("\n") // Split by new lines
      .map(line => line.trim()) // Trim each line
      .filter(line => line !== ""); // Remove empty lines
  }

async function add_Rec(){
    // add recipes please
    recipeName = reci.value
    recipeList = processIngredients(ingredent_list.value);
    recipeDirct = directions.value
    recipeDescrip = description .value


    let new_rec = {
        "Rname": recipeName,
        "ingredents": recipeList,
        "steps": recipeDirct,
        "description": recipeDescrip
    };    
    
    try {
        // Check for duplicates in localStorage
        const existingNames = new Set(
            items.map(item => recpi.name)
        );
        
        if (existingNames.has(recipeName.toLowerCase())) {
            alert(`"${recipeName}" already exists!`);
            return;
        }

        // Add to local storage
        items.push(new_rec);
        localStorage.setItem('recipes', JSON.stringify(items));

        // If you're using a server endpoint
        try {
            const response = await fetch(recipUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(new_rec)
            });
            
            console.log("Successfully added to server");
        } catch (error) {
            console.error("Error sending to server:", error);
        }

        // Clear inputs
        reci.value = "";
        ingredent_list.value = "";
        directions.value = "";
        description.value = "";

        alert("receipe added successfully!");
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding the recipe");
    }

}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeElements();
    add_event_listeners();
});