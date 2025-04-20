window.addEventListener("load", initialize);

ingredients_db = new URL("http://localhost:8000/Ingredients");
recipes_db = new URL("http://localhost:8001/Recipes");
user_entered_ingredients = []
function DOM_references(){
    // Add Ingredient left-side area
    ingredient_name = document.getElementById("insert_new_ingredient_text_input");
    ingredient_price = document.getElementById("insert_new_ingredient_price_text_input");
    ingredient_description = document.getElementById("insert_new_description_textarea_input")
    add_ingredient_button = document.getElementById("add_new_ingredient_button");
    search_ingredient_button = document.getElementById("search_ingredient_button");
    update_ingredient_button = document.getElementById("update_ingredient_button");
    // Add Recipe left-side area
    recipe_name = document.getElementById("insert_new_recipe_text_input");
    recipe_ingredient_list = document.getElementById("insert_new_ingredients_text_input");
    recipe_directions = document.getElementById("insert_new_directions_textarea");
    recipe_description = document.getElementById("insert_new_description_textarea");
    add_recipe_button = document.getElementById("add_new_recipe_button");
    update_recipe_button = document.getElementById("update_recipe_button");
    // Search Recipe left-side area
    search_recipe_name = document.getElementById("insert_recipe_name_text_input");
    search_recipe_button = document.getElementById("search_recipe_button");
    save_recipe_button = document.getElementById("save_recipe_button");
    //display div
    output_div = document.getElementById("search_results");
    //Adding ingredients to list 
    input_ingredient_name = document.getElementById("ingredientInput");
    input_ingredient = document.getElementById("add_button");
    remove_ingredient = document.getElementById("remove_button");
    search_button = document.getElementById("search_button");
    clear_all_button = document.getElementById("clear_all_button");
    ingredients_display_list = document.getElementById("ingredients_list");
    recipe_display_list = document.getElementById("recipe_list");
}

function event_listeners(){
    // Add Ingredient left-side area
    add_ingredient_button.addEventListener("click", add_ingredient);
    search_ingredient_button.addEventListener("click", search_ingredient);
    update_ingredient_button.addEventListener("click", update_ingredient);
    // Add recipe left side area
    add_recipe_button.addEventListener("click", add_recipe);
    update_recipe_button.addEventListener("click", update_recipe);
    // Search Recipe left side area
    search_recipe_button.addEventListener("click", search_recipe);
    save_recipe_button.addEventListener("click", save_recipe);
    // Adding to ingredient list
    input_ingredient.addEventListener("click", add_ingredient_to_list);
    remove_ingredient.addEventListener("click", remove_ingredient_from_list);
    search_button.addEventListener("click", search);
    clear_all_button.addEventListener("click", clear_list);
}

async function add_ingredient(){
    let name = ingredient_name.value.toLowerCase().trim();
    let price = ingredient_price.value;
    let description = ingredient_description.value;
    if(name == "" || price == "" || description == ""){
        alert("Ingredient name, price, and description fields must be filled in");
        return
    }
    let ingredient = {
        "name": name,
        "price": price,
        "description": description,
        "id": name
    }
    await db_add(ingredients_db, ingredient);
    ingredient_name.value = "";
    ingredient_price.value = "";
    ingredient_description.value = "";
}

async function add_recipe(){
    let name = recipe_name.value.toLowerCase().trim();
    let ingredient_list = processIngredients(recipe_ingredient_list.value);
    let directions = recipe_directions.value;
    let description = recipe_description.value;
    if(name == "" || ingredient_list == "" || description == "" || directions == ""){
        alert("Recipe name, ingredient list, description, and directions fields must be filled in");
        return
    }
    let recipe = {
        "name": name,
        "ingredient_list": ingredient_list,
        "description": description,
        "directions": directions,
        "id": name
    }
    await db_add(recipes_db, recipe);
    recipe_name.value = "";
    recipe_description.value = "";
    recipe_ingredient_list = "";
    recipe_directions = "";
}

async function update_ingredient(){
    let name = ingredient_name.value.toLowerCase().trim();
    let price = ingredient_price.value;
    let description = ingredient_description.value;
    let updates = {}
    if(name != ""){updates["name"] = name;}
    if(price != ""){updates["price"] = price;}
    if(description != ""){updates["description"] = description;}
    await db_update(`${ingredients_db}/${name}`, updates);
    ingredient_name.value = "";
    ingredient_price.value = "";
    ingredient_description.value = "";
}

async function update_recipe(){
    let name = recipe_name.value.toLowerCase().trim();
    let ingredient_list = processIngredients(recipe_ingredient_list.value);
    let directions = recipe_directions.value;
    let description = recipe_description.value;
    let updates = {}
    if(name != ""){updates["name"] = name;}
    if(ingredient_list != ""){updates["ingredient_list"] = ingredient_list;}
    if(description != ""){updates["description"] = description;}
    if(directions != ""){updates["directions"] = directions;}
    await db_update(`${recipes_db}/${name}`, updates);
    recipe_name.value = "";
    recipe_price.value = "";
    recipe_description.value = "";
    recipe_ingredient_list = "";
    recipe_directions = "";
}

async function search_ingredient(){
    let name = ingredient_name.value.toLowerCase().trim();
    if(name == ""){
        alert("You have to include the name of the ingredient to search for it");
        return;
    }
    let ingredient = await db_get(`${ingredients_db}/${name}`);
    output_div.innerHTML = "";
    let output_ingredient_name = document.createElement("h3");
    let output_ingredient_price = document.createElement("p");
    let output_ingredient_description = document.createElement("p");
    let brk = document.createElement("br");
    output_ingredient_name.innerText = `Ingredient - ${ingredient.name}`;
    output_ingredient_price = `Price - $${ingredient.price}`;
    output_ingredient_description = `Description - ${ingredient.description}`;
    output_div.append(output_ingredient_name, output_ingredient_price, brk, output_ingredient_description);
    ingredient_name.value = "";
}

async function search_recipe(){
    let name = search_recipe_name.value.toLowerCase().trim();
    if(name == ""){
        alert("You have to include the name of the recipe to search for it");
        return;
    }
    let recipe = await db_get(`${recipes_db}/${name}`);
    output_div.innerHTML = "";
    let output_recipe_name = document.createElement("h3");
    let output_ingredient_list = document.createElement("p");
    let output_description = document.createElement("p");
    let output_directions= document.createElement("p");
    output_recipe_name.innerText = `Recipe - ${recipe.name}`;
    output_ingredient_list.innerText = `Ingredients - ${recipe.ingredient_list}`;
    output_description.innerText = `Description - ${recipe.description}`;
    output_directions.innerText = `Directions - ${recipe.directions}`;
    output_div.append(output_recipe_name, output_description, output_ingredient_list, output_directions);
    recipe_name.value = "";
}

function save_recipe(){

}

function add_ingredient_to_list(){
    let temp = input_ingredient_name.value.toLowerCase().trim();
    if (temp && !user_entered_ingredients.includes(temp)) {
        user_entered_ingredients.push(temp);
        let new_li = document.createElement("li");
        new_li.textContent = temp;
        ingredients_display_list.appendChild(new_li);
    }
    input_ingredient_name.value = "";
}

function remove_ingredient_from_list(){
    let temp = input_ingredient_name.value.toLowerCase().trim();
    if (temp && user_entered_ingredients.includes(temp)) {
        user_entered_ingredients.splice(user_entered_ingredients.indexOf(temp), 1);
        for (let i = 0; i < ingredients_display_list.children.length; i++) {
            let remove_li = ingredients_display_list.children[i];
            if (remove_li.textContent.toLowerCase() === temp) {
                ingredients_display_list.removeChild(remove_li);
                break;
            }
        }
    }
    input_ingredient_name.value = "";
}

function clear_list(){
    user_entered_ingredients = [];
    ingredients_display_list.innerHTML = "";
    recipe_display_list.innerHTML = "";
}

async function search(){
    let all_recipes = await db_get(recipes_db);
    recipe_display_list.innerHTML = "";
    for(let recipe of all_recipes){
        let valid = true;
        let recipe_json = recipe["ingredient_list"];
        if(user_entered_ingredients.length != recipe_json.length){
            continue;
        }
        for(let i of user_entered_ingredients){
            if(recipe_json.includes(i)){
                continue;
            }
            else{
                valid = false;
                break;
            }
        }
        if(valid){
            let new_recipe = document.createElement("li");
            let new_recipe_div = document.createElement("div");
            let new_recipe_name = document.createElement("h3");
            let new_recipe_description = document.createElement("p");
            new_recipe_name.innerText = `Recipe Name - ${recipe["name"]}`;
            new_recipe_description.innerText = `Description - ${recipe["description"]}`;
            new_recipe_div.append(new_recipe_name, new_recipe_description);
            new_recipe.append(new_recipe_div);
            recipe_display_list.appendChild(new_recipe);
        }
    }
}

function initialize(){
    DOM_references();
    event_listeners();
}

async function db_add(db_url, addition){
    return await fetch(db_url, 
        {
            method: "POST", 
            body: JSON.stringify(addition),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .catch(error => console.error(error));
}

async function db_update(db_url, update){
    return await fetch(db_url, 
        {
            method: "PATCH", 
            body: JSON.stringify(update),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .catch(error => console.error(error));
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

function processIngredients(input) {
    let temp = input.split(",");
    for(let i = 0; i < temp.length; i++){
        temp[i] = temp[i].trim();
    }
    return temp;
  }