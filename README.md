# CS1530 Project - Pocket Pantry

## Description
Simple website that will allow users to select ingredients to search for recipes, add ingredients, add recipes, and keep a ingredient list. The goal is to allow users to use ingredients in their homes to create recipes and reduce food waste. 

### Tech Stack
- HTML/CSS <br>
- JS <br>
- Node.js

## Known issue
there is a possible issue with one either one of our databases where when you do the npx json-server --watch Recipes.json --port 8001
there is a possibility that the Recipes.json becomes recipes.json when loading in. If this does happen please manually change the line that says 
recipes_db = new URL("http://localhost:8001/Recipes"); to
recipes_db = new URL("http://localhost:8001/recipes");
## Getting Started

1. Download Node.js from https://nodejs.org/en
2. Clone the repository to your system
3. If using VS Code, download the Live Server extension to run the program
4. Right click the main_page.html and start the Live Server
5. Set up the JSON databases by entering the two commands in seperate terminals <br>
npx json-server --watch Recipes.json --port 8001 <br>
npx json-server --watch Ingredients.json --port 8000

## Project Members
Ket-Hwa Cheng, Aidan Conroy, Alexandr Yarashevich, Steven Zheng
