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

    const existingNames = new Set(
        existingIngredients.map(item => item.name.toLowerCase())
    );

    if (existingNames.has(ingred.toLowerCase())) {
        alert(`"${ingred}" already exists!`);
        return;
    }

    let ingred = ingredname.value;
    let expense = price.value;

    let new_ingred = {
        "name": ingred,
        "price": expense   
    }

    await http_post_request(blog_url, new_blog);

    ingred = "";
    expense = "";

    output_window.innerHTML = "";

}