window.addEventListener("load", initialize);

ingredients_db = new URL("http://localhost:8000/Ingredients");

async function initialize(){
    display = document.getElementById("display_div");
    let all_ingredients = await db_get(ingredients_db);
    for(let ingredient of all_ingredients){
        let display_div = document.createElement("div");
        let ingredient_name = document.createElement("h3");
        let ingredient_price = document.createElement("p");
        let ingredient_description = document.createElement("p");
        ingredient_name.innerText = `Name - ${ingredient["name"]}`
        ingredient_price.innerText = `Price - $${ingredient["price"]}`
        ingredient_description.innerText = `Description - ${ingredient["description"]}`
        display_div.append(ingredient_name, ingredient_price, ingredient_description);
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