async function fetchItems() {
    const response = await fetch('Ingredents.json'); // Replace with your JSON file/API
    const data = await response.json();
    return data;
}