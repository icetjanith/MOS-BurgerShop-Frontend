

/*document.getElementById('cart-icon').addEventListener('click', function() {
    if (window.innerWidth < 1200) {
        window.location.href = 'cart.html';
    } else {
        const cart = document.getElementById('cart');
        const header = document.getElementById('header');
        const maincontent = document.getElementById('main-content');
        const items = document.getElementById('items');
        if (cart.style.display === 'none' || cart.style.display === '') {
            cart.style.display = 'block';
            header.style.right = '300px';
            maincontent.style.marginRight = '300px';
            items.style.gridTemplateColumns = 'repeat(4 ,1fr)';
        } else {
            cart.style.display = 'none';
            header.style.right = '0';
            maincontent.style.marginRight = '0';
            items.style.gridTemplateColumns = 'repeat(6 ,1fr)';
        }
    }
});*/

export const items = [{ id: 1, name: 'Burger 1', imageSrc: 'img/burger1.jpg' },
    { id: 2, name: 'Burger 2', imageSrc: 'img/burger2.jpg' },];

window.addEventListener('resize', function() {
        const cart = document.getElementById('cart');
        const header = document.getElementById('header');
        const maincontent = document.getElementById('main-content');
        const items = document.getElementById('items');
    if (window.innerWidth <= 1380) {
        cart.style.display = 'none';
        header.style.right = '0';
        maincontent.style.marginRight = '0';
        items.style.gridTemplateColumns = 'repeat(5 ,1fr)';
    }else{
        cart.style.display = 'block';
        header.style.right = '300px';
        maincontent.style.marginRight = '300px';
    }
});

document.getElementById('navbar-toggler').addEventListener('click',function(){
    const header = document.getElementById('header');
    const margin = document.getElementById('items');
    if(header.style.top = '200px'){
        header.style.top = '250px';
        margin.style.marginTop = '430px'
        console.log("ok-02");
    }
})

document.getElementById('navbar-toggler').addEventListener('dblclick',function(){
    const header = document.getElementById('header');
    const margin = document.getElementById('items');
    if(header.style.top = '200px'){
        header.style.top = '60px';
        margin.style.marginTop = '240px'
        console.log("ok-02");
    }
})

let itemIdCounter = 1;

        document.getElementById('itemForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const itemImageInput = document.getElementById('itemImage');
            const itemNameInput = document.getElementById('itemName');
            const itemPriceInput = document.getElementById('itemPrice'); 

            const itemImage = itemImageInput.files[0];
            const itemName = itemNameInput.value;
            const itemPrice = itemPriceInput.value;

            if (!itemImage || !itemName || !itemPrice) {
                alert('Please fill out all fields.');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                console.log("good")
                const itemId = `item-${itemIdCounter++}`;
                createItemCard(itemId, e.target.result, itemName, itemPrice);
                $('itemModal').modal('hide');
                itemImageInput.value = '';
                itemNameInput.value = '';
                itemPriceInput.value = '';
            };
            reader.readAsDataURL(itemImage);

            const newItem = {
                id: items.length + 1,
                name: document.getElementById('itemName').value,
                category: document.getElementById('itemCategory').value,
                price: parseFloat(document.getElementById('itemPrice').value),
                quantity: parseInt(document.getElementById('itemQuantity').value),
                expirationDate: new Date(document.getElementById('itemExpirationDate').value),
                code: document.getElementById('itemCode').value,
            };
            items.push(newItem);
            $('#itemModal').modal('hide');
            
        });

        
        function createItemCard(id, imgSrc, name, price) {
            // Create the main item div
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.id = id;

            // Create the anchor tag and image
            const anchor = document.createElement('a');
            const img = document.createElement('img');
            img.className = 'w-100 h-75';
            img.src = imgSrc;
            img.alt = name;
            anchor.appendChild(img);
            anchor.href = 'item.html';

            // Create the lower div
            const lowerDiv = document.createElement('div');
            lowerDiv.className = 'lower w-100 h-25 bg-white';

            // Create the item name div
            const itemNameDiv = document.createElement('div');
            itemNameDiv.className = 'item-name d-flex justify-content-center';
            const itemNameElem = document.createElement('h5');
            itemNameElem.className = 'mt-2';
            itemNameElem.style.fontWeight = '600';
            itemNameElem.textContent = name;
            itemNameDiv.appendChild(itemNameElem);

            // Create the details div
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'details';

            // Create the price div
            const priceDiv = document.createElement('div');
            priceDiv.className = 'price-div';
            const itemPriceElem = document.createElement('h5');
            itemPriceElem.className = 'price';
            itemPriceElem.textContent = `Rs.${price}`;
            priceDiv.appendChild(itemPriceElem);

            // Create the add button
            const addButton = document.createElement('button');
            addButton.type = 'button';
            addButton.className = 'add-cart-btn';
            addButton.textContent = 'ADD';

            // Append elements to their respective parents
            detailsDiv.appendChild(priceDiv);
            detailsDiv.appendChild(addButton);
            lowerDiv.appendChild(itemNameDiv);
            lowerDiv.appendChild(detailsDiv);
            itemDiv.appendChild(anchor);
            itemDiv.appendChild(lowerDiv);

            // Append the item card to the container
            document.getElementById('items').appendChild(itemDiv);
        }







