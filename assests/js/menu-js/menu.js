let cart = JSON.parse(localStorage.getItem('cart')) || [];

let total=0;

function addToCart(itemCode, itemImage, itemPrice, itemName) {
    console.log(itemImage);
    console.log(itemName);
    document.getElementById('emptyCartImg').style.display = 'none';
    let totalPrice=document.getElementById('total');
    let existingItem = cart.find(item => item.itemCode === itemCode);
    if (existingItem) {
        
        existingItem.quantity += 1;
        total+=itemPrice;
        totalPrice.innerHTML="Total : "+total;
    } else {
        
        cart.push({ image: itemImage, itemCode: itemCode, name: itemName, price: itemPrice, quantity: 1 });
        total+=itemPrice;
        totalPrice.innerHTML="Total : "+total;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
}

function displayCart() {

    total=0;

    let totalPrice=document.getElementById('total');

    if(cart.length > 0) {
        document.getElementById('emptyCartImg').style.display = 'none';
    }

    const cartSection = document.getElementById("cart_section");
    cartSection.innerHTML = "";

    cart.forEach(item => {

        console.log(item.name);
        console.log(item.image);
        cartSection.innerHTML += `
            <div class="cart_item mb-2">
                <div class="image">
                    <img
                        src="${item.image}"
                        alt="" srcset="">
                </div>
                <div class="name">
                    ${item.name}
                </div>
                <div class="totalPrice">
                    ${item.price * item.quantity}
                </div>
                <div class="quantity">
                    ${item.quantity}
                </div>
            </div>
        `;

        total+=item.price * item.quantity;

    });
    totalPrice.innerHTML="Total : "+total;
}


window.onload = displayCart;

async function loadItems() {
    let spinner = document.getElementById("spinner");
    spinner.style.display = 'flex';

    try {
        let res = await fetch("http://localhost:8080/item/all");
        let data = await res.json();
        data.forEach(element => {
            createItem(element.itemImage, element.itemName, element.itemPrice, element.itemId);
        });

    } catch (error) {

    } finally {
        spinner.style.display = 'none';
    }
}

loadItems();

var navbar = document.querySelector(".navbar");
var header = document.querySelector('.header');
var mainContent = document.querySelector('.main_content');

var viewPortWidth;
var headerHeight;

function checkBrowserSize() {
    viewPortWidth = window.innerWidth;
}

// Function to adjust the top value
function adjustMainContentTop() {
    headerHeight = header.offsetHeight; // Get the height of the header

    if (viewPortWidth <= 992) {
        var navbarHeight = navbar.offsetHeight;
        mainContent.style.top = headerHeight + navbarHeight + 'px';
    } else {
        mainContent.style.top = headerHeight + 'px';
    }
}

// Initial adjustment
checkBrowserSize();
adjustMainContentTop();

// Adjust on window resize if the header height can change
window.addEventListener('resize', checkBrowserSize);
window.addEventListener('resize', adjustMainContentTop);

function createItem(itemImage, Name, itemPrice, itemId) {

    let mainDiv = document.createElement('div');
    mainDiv.classList.add("col-lg-2", "col-md-3", "col-sm-3", "col-6", "mx-lg-auto", "mx-md-auto", "mx-sm-auto", "mx-0", "mt-4", "mainDiv");
    document.getElementById("row").appendChild(mainDiv);

    let itemDiv = document.createElement('div');
    itemDiv.classList.add("item");
    mainDiv.appendChild(itemDiv);

    let link = document.createElement('a');
    link.href = `item-details.html?code=${itemId}`;

    let img = document.createElement('img');
    img.classList.add("img-class", "img-fluid", "rounded-2");
    img.style.height = '12rem';
    img.style.width = '100%';
    img.src = itemImage;

    link.appendChild(img);
    itemDiv.appendChild(link);

    let lowerDiv = document.createElement('div');
    lowerDiv.classList.add("lower", "bg-white");
    itemDiv.appendChild(lowerDiv);

    let itemName = document.createElement('div');
    itemName.classList.add("item-name");

    let name = document.createElement('h5');
    name.textContent = Name;
    name.classList.add("name", "mt-2");
    itemName.appendChild(name);
    lowerDiv.appendChild(itemName);

    let detailsDiv = document.createElement('div');
    detailsDiv.classList.add("details");
    lowerDiv.appendChild(detailsDiv);

    let priceDiv = document.createElement('div');
    priceDiv.classList.add("price-div");
    detailsDiv.appendChild(priceDiv);

    let price = document.createElement('h5');
    price.textContent = itemPrice;
    price.classList.add("price");
    price.textContent = "Rs." + itemPrice;
    priceDiv.appendChild(price);

    let btnDiv = document.createElement('div');
    detailsDiv.appendChild(btnDiv);

    let addButton = document.createElement('button');
    addButton.classList.add("add-cart-btn");
    addButton.textContent = "ADD";
    addButton.setAttribute('data-item-code', itemCode);
    btnDiv.appendChild(addButton);

    addButton.addEventListener("click", function () {

        addToCart(this.getAttribute("data-item-code"), itemImage, itemPrice, Name);
    });
}

function addProduct(event) {
    let itemModel=bootstrap.Modal.getOrCreateInstance("#itemModal");
    
    event.preventDefault();
    console.log("clicked");
    const fileInput = document.getElementById("itemImage");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const base64Image = event.target.result;
        console.log(base64Image);
        let itemDetails = {};

        itemDetails.itemImage = base64Image;
        itemDetails.itemName = document.getElementById("itemName").value;
        itemDetails.itemCategory = document.getElementById("itemCategory").value;
        itemDetails.itemPrice = document.getElementById("itemPrice").value;
        itemDetails.itemQuantity = document.getElementById("itemQuantity").value;
        itemDetails.itemExpiryDate = document.getElementById("itemExpirationDate").value;
        itemDetails.itemCode = document.getElementById("itemCode").value;

        fetch("http://localhost:8080/item/saveitem", {

            method: "POST",

            body: JSON.stringify(itemDetails),

            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                itemModel.hide();
                createItem(json.itemImage, json.itemName, json.itemPrice,json.itemId);
            }
            );

    };

    reader.readAsDataURL(file);

}

document.getElementById("setting").addEventListener('click',function(){
    console.log("settings clicked")
    let itemModel=bootstrap.Modal.getOrCreateInstance("#itemModal");
    itemModel.show();
});



document.getElementById("addBtn").addEventListener('click', addProduct);

document.getElementById('all').addEventListener('click', function(){
    document.getElementById("row").innerHTML='';
    loadItems();
});


async function getItemsByCategory(category) {
    
    let spinner = document.getElementById("spinner");
    spinner.style.display = 'flex';

    try {
        let res = await fetch(`http://localhost:8080/item/getitems/${category}`);
        let data = await res.json();
        data.forEach(element => {
            createItem(element.itemImage, element.itemName, element.itemPrice, element.itemCode);
        });

    } catch (error) {

    } finally {
        spinner.style.display = 'none';
    }
}

document.getElementById('burgers').addEventListener('click', function(){
    document.getElementById("row").innerHTML='';
    getItemsByCategory('burger');
});

document.getElementById('hotdog').addEventListener('click', function(){
    document.getElementById("row").innerHTML='';
    getItemsByCategory('hotdog');
});

document.getElementById('beverage').addEventListener('click', function(){
    document.getElementById("row").innerHTML='';
    getItemsByCategory('beverage');
});

document.getElementById('checkout_button').addEventListener('click', function(){
    let myModal = bootstrap.Modal.getOrCreateInstance("#checkout");
    myModal.show();
});

