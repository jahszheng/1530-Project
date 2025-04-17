async function fetchItems() {
    const response = await fetch('Ingredents.json'); // Replace with your JSON file/API
    const data = await response.json();
    return data;
}

async function searchItems() {
    const searchTerm = document.getElementById('search-pantry').value.toLowerCase();
    const items = await fetchItems();

    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
    );

    updateList(filteredItems);
}

function updateList(items) {
    const list = document.getElementById('list-of-items');
    list.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'pantry-item';
        li.innerHTML = `
            <h3>${item.name}</h3>
            <h4>${item.price}</h4>
        `;
        list.appendChild(li);
    });
}