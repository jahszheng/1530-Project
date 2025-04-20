window.addEventListener("load", initialize);

recipes_db = new URL("http://localhost:8001/Recipes");

async function initialize(){
    display = document.getElementById("display_div");
    let all_recipes = await db_get(recipes_db);
    for(let recipe of all_recipes){
        let display_div = document.createElement("div");
        let recipe_name = document.createElement("h3");
        let recipe_description = document.createElement("p");
        let recipe_directions = document.createElement("p");
        let recipe_ingredient_list = document.createElement("p");
        let brk = document.createElement("br");
        recipe_name.innerText = `Name - ${recipe["name"]}`
        recipe_description.innerText = `Description - ${recipe["description"]}`
        recipe_ingredient_list.innerText = `Ingredient List - ${recipe["ingredient_list"]}`
        recipe_directions.innerText = `Directions - ${recipe["directions"]}`
        display_div.append(recipe_name, recipe_description, recipe_ingredient_list, recipe_directions);
        display.append(display_div);
    }
}

async function db_get(db_url){
    return await fetch(db_url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error(error));
}