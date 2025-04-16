const fs = require('fs');

var ingreds = new URL("http://localhost:8000/ingreds");
ingredname;
price;

function addIngredient(){
    addIngredentButton = document.getElementById("add_new_sp_button").addEventListener("submit", async (e));
    ingredname = document.getElementById("insert_new_ingredient_text_input").value.trim();
    price = document.getElementById("insert_new_ingredient_price_text_input").value;

}

function add_event_listeners(){
    addIngred.addEventListener("click",add_ingredints);
}

async function add_ingredints(){
    let ingred = ingredname;
    let expense = price;


}