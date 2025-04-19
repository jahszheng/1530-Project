// Initialize variables properly
let ingredname, price, addIngredentButton;
const items = JSON.parse(localStorage.getItem('Ingredents')) || [];
const recpi = JSON.parse(localStorage.getItem('recipes')) || [];
// Initialize URL object correctly (if you're using it)
const ingredsUrl = "http://localhost:8000/Ingredents";
const recipUrl = "http://localhost:8001/recipes";

function initializeElements() {
    ingredname = document.getElementById("insert_new_ingredient_text_input");
    price = document.getElementById("insert_new_ingredient_price_text_input");
    addIngredentButton = document.getElementById("add_new_ingredient_button");

    reci = document.getElementById("insert_new_recipe_text_input");
    ingredent_list = document.getElementById("insert_new_ingredients_text_input");
    directions = document.getElementById("insert_new_directions_textarea");
    description = document.getElementById("insert_new_description_textarea");
    buttonRecp = document.getElementById("add_new_recipe_button");

    button_get_recp = document.getElementById("search_recipe_button");
    button_recipe_save = document.getElementById("insert_recipe_name_text_input");

    add_ing_button = document.getElementById("add_button");
    remove_ing_button = document.getElementById("remove_button");
    search_button = document.getElementById("search_button");
}

function add_event_listeners() {
    // Make sure elements are initialized first
    initializeElements();
    addIngredentButton.addEventListener("click", add_ingredints);
    buttonRecp.addEventListener("click", add_Rec);
    button_get_recp.addEventListener("click", searchRecp);
    add_ing_button.addEventListener("click", addIng);
    remove_ing_button.addEventListener("click", removeIng);
    search_button.addEventListener("click", searchIng);

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

async function add_Rec() {
    // add recipes please
    recipeName = reci.value
    recipeList = processIngredients(ingredent_list.value);
    recipeDirct = directions.value
    recipeDescrip = description.value


    let new_rec = {
        "Rname": recipeName.toLowerCase().trim(),
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
        recpi.push(new_rec);
        localStorage.setItem('recipes', JSON.stringify(recpi));

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


async function searchRecp() {
    const recipeNameToSearch = button_recipe_save.value.trim().toLowerCase();

    //  Attempt to fetch JSON database with recipes
    try {
        const response = await fetch(recipUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch recipes from server");
        }

        // Wait on JSON database
        const recipes = await response.json();

        // Check if entered in recipe is the same as recipe in database
        const foundRecipe = recipes.find(recipe =>
            recipe.Rname === recipeNameToSearch
        );

        // If found, call displayRecipe to display the recipe
        if (foundRecipe) {
            console.log("Found recipe:", foundRecipe);
            displayRecipes([foundRecipe]);
        } else {
            alert(`Recipe "${recipeNameToSearch}" not found`);
        }
    } catch (error) {
        console.error("Error fetching from server:", error);
        alert("Could not connect to server or fetch data.");
    }
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe_list');
    const recipesBox = document.querySelector('.recipes_box');

    // Clear previous results
    recipeList.innerHTML = '';

    if (recipes.length === 0) {
        recipeList.innerHTML = '<li>No matching recipes found</li>';
        recipesBox.style.display = 'block';
        return;
    }

    // Create list items for each recipe
    recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.className = 'recipe-item';
        li.innerHTML = `
            <h3>${recipe.Rname}</h3>
            <p class="description">${recipe.description || ''}</p>
            <div class="ingredients">
                <strong>Ingredients:</strong>
                <ul>
                    ${recipe.ingredents.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
            <div class="steps">
                <strong>Directions:</strong>
                <p>${recipe.steps.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        recipeList.appendChild(li);
    });

    // Show the recipes box
    recipesBox.style.display = 'block';
}
// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeElements();
    add_event_listeners();
});

const ingredients = [];
function addIng() {
    const input = document.getElementById("ingredientInput");
    const value = input.value.trim().toLowerCase();
    // Check if value is not in list, if not add and create list item
    if (value && !ingredients.includes(value)) {
        ingredients.push(value);
        const li = document.createElement("li");
        li.textContent = value;
        document.getElementById("ingredients_list").appendChild(li);
    }
    input.value = "";
}

function removeIng() {
    const input = document.getElementById("ingredientInput");
    const value = input.value.trim().toLowerCase();
    const list = document.getElementById("ingredients_list");
    // Check if value is in list, remove if it is
    if (value && ingredients.includes(value)) {
        ingredients.splice(ingredients.indexOf(value), 1);

        for (let i = 0; i < list.children.length; i++) {
            const li = list.children[i];
            if (li.textContent.toLowerCase() === value) {
                list.removeChild(li);
                break;
            }
        }
    }
    input.value = "";
}

function searchIng() {

}