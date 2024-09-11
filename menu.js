

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
const buttonName1 = document.getElementById("btn-name1");
const buttonName2 = document.getElementById("btn-name2");
const buttonName3 = document.getElementById("btn-name3");
if(window.innerWidth < 1000){
    buttonName1.style.display = 'none';
    buttonName2.style.display = 'none';
    buttonName3.style.display = 'none';
}else{
    buttonName1.style.display = '';
    buttonName2.style.display = '';
    buttonName3.style.display = '';
}

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

let items = [{
    id: 1,
    name: "Classic Burger",
    category: "Food",
    price: 5.99,
    quantity: 10,
    expirationDate: new Date("2024-08-15"),
    code: "CB001"
},
{
    id: 2,
    name: "Veggie Burger",
    category: "Food",
    price: 6.49,
    quantity: 5,
    expirationDate: new Date("2024-08-20"),
    code: "VB002"
},
{
    id: 3,
    name: "French Fries",
    category: "Food",
    price: 2.99,
    quantity: 20,
    expirationDate: new Date("2024-08-10"),
    code: "FF003"
},
{
    id: 4,
    name: "Cola",
    category: "Beverage",
    price: 1.99,
    quantity: 30,
    expirationDate: new Date("2024-12-01"),
    code: "CO004"
},
{
    id: 5,
    name: "Classic Burger",
    category: "Food",
    price: 5.99,
    quantity: 10,
    expirationDate: new Date("2024-08-15"),
    code: "CB001"
},
{
    id: 6,
    name: "Classic Burger",
    category: "Food",
    price: 5.99,
    quantity: 10,
    expirationDate: new Date("2024-08-15"),
    code: "CB001"
},
{
    id: 7,
    name: "Classic Burger",
    category: "Food",
    price: 5.99,
    quantity: 10,
    expirationDate: new Date("2024-08-15"),
    code: "CB001"
},
{
    id: 8,
    name: "Classic Burger",
    category: "Food",
    price: 5.99,
    quantity: 10,
    expirationDate: new Date("2024-08-15"),
    code: "CB001"
},
{
    id: 9,
    name: "Classic Burger",
    category: "Food",
    price: 5.99,
    quantity: 10,
    expirationDate: new Date("2024-08-15"),
    code: "CB001"
},
{
    id: 10,
    name: "Classic Burger",
    category: "Food",
    price: 5.99,
    quantity: 10,
    expirationDate: new Date("2024-08-15"),
    code: "CB001"
},
{
    id: 11,
    name: "Classic Burger",
    category: "Food",
    price: 5.99,
    quantity: 10,
    expirationDate: new Date("2024-08-15"),
    code: "CB001"
},
{
    id: 12,
    name: "Classic Burger",
    category: "Food",
    price: 5.99,
    quantity: 10,
    expirationDate: new Date("2024-08-15"),
    code: "CB001"
}];



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
            anchor.href = `item.html?id=${id}`;

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

            console.log(items.length);
            items.forEach(item=>{
                console.log(`ID: ${item.id}, Name: ${item.name}, Price: $${item.price}`);
            });

            anchor.addEventListener('click',function(event){
                event.preventDefault();
                console.log("cliked");
                items.forEach(item=>{
                    console.log(`ID: ${item.id}, Name: ${item.name}, Price: $${item.price}`);
                });

                let givenId = 1;
                const foundItem = items.find(item => item.id === givenId);

                if (foundItem) {
                    console.log('Item found:', foundItem);
                    localStorage.setItem('selectedItem', JSON.stringify(foundItem));
                    console.log('Stored Item:', localStorage.getItem('selectedItem'));              
                    window.location.href = "item.html";
                    const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
                    document.getElementById('item-name').textContent = selectedItem.name;
                    document.getElementById('main-img').src = selectedItem.imageSrc;
                } else {
                    console.log('Item not found');
                }

                
                

            })
        }

        

        






