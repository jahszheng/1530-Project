// Initialize variables properly
let ingredname, price, addIngredentButton;
const items = JSON.parse(localStorage.getItem('Ingredents')) || [];

// Initialize URL object correctly (if you're using it)
const ingredsUrl = "http://localhost:8000/ingreds";

function initializeElements() {
    ingredname = document.getElementById("insert_new_ingredient_text_input");
    price = document.getElementById("insert_new_ingredient_price_text_input");
    addIngredentButton = document.getElementById("add_new_ingredent");
}

function add_event_listeners() {
    // Make sure elements are initialized first
    initializeElements();
    addIngredentButton.addEventListener("click", add_ingredints);
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
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
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

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeElements();
    add_event_listeners();
});