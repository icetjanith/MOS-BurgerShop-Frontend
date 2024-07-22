// menu.js
import { items } from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchItems();
});

function fetchItems() {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h5>${item.name}</h5>
            <button class="btn btn-info" onclick="loadItemImage(${item.id})">View</button>
        `;
        itemsContainer.appendChild(itemDiv);
    });
}

function loadItemImage(itemId) {
    const item = items.find(item => item.id === itemId);
    if (item) {
        const mainImg = document.getElementById('main-img');
        mainImg.src = item.imageSrc;
    }
}
